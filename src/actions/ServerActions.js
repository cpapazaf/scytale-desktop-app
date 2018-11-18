import io from 'socket.io-client'
import * as types from '../constants/ActionTypes'
import {STATUS_OFFLINE, STATUS_ONLINE} from '../constants/ServerConstants'
import * as SimplePeerActions from './SimplePeerActions'
import { getChatRoomName, getRemoteServerUrl } from '../selectors/AppSelectors'
import { getPeer } from '../selectors/PeerSelectors'

class SocketHandler {
    constructor ({ socket, roomName, dispatch, getState }) {
      this.socket = socket
      this.roomName = roomName
      this.dispatch = dispatch
      this.getState = getState
    }
    handleSignal = ({ userId, signal }) => {
      const peer = getPeer(this.getState(), userId)
      peer && peer.peerObject.signal(signal)
    }
    handleUsers = ({ initiator, users }) => {
      const { socket, dispatch, getState } = this
      const state = getState()

      users
      .filter(user => !getPeer(state, user.id) && user.id !== socket.id)
      .forEach(user => dispatch(SimplePeerActions.createPeer({
        socket,
        user,
        initiator
      })))
    }
  }

const handshake = ({ socket }) => {
  return (dispatch, getState) => {
    const roomName = getChatRoomName(getState())
    const handler = new SocketHandler({
      socket,
      roomName,
      dispatch,
      getState
    })

    socket.on('signal', handler.handleSignal)
    socket.on('users', handler.handleUsers)
    socket.emit('ready', roomName)
  }
}

const connect = (remoteServerUrl) => dispatch => {
  const socket = io.connect(remoteServerUrl, {reconnect: true})
  return new Promise(resolve => {
      socket.once('connect', () => {
          resolve(socket)
      })
      socket.on('connect', () => {
          dispatch({
            type: types.STATUS,
            payload: {
              status: STATUS_ONLINE
            }
          })
      })
      socket.on('disconnect', () => {
          dispatch({
            type: types.STATUS,
            payload: {
              status: STATUS_OFFLINE
            }
          })
      })
  })
}

const initConnection = () => {
  return (dispatch, getState) => {
    const remoteServerUrl = getRemoteServerUrl(getState())
    return dispatch({
      type: types.INIT_CONNECTION,
      payload: connect(remoteServerUrl)(dispatch)
              .then((socket) => {
                  dispatch(handshake({
                      socket
                  }))
              })
    })
  }
}

export const init = () => dispatch => {
  return dispatch(initConnection())
}