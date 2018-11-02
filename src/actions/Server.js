import io from 'socket.io-client'
import * as actions from '../constants/ServerActions'
import * as SimplePeerActions from './SimplePeer'

class SocketHandler {
    constructor ({ socket, roomName, dispatch, getState }) {
      this.socket = socket
      this.roomName = roomName
      this.dispatch = dispatch
      this.getState = getState
    }
    handleSignal = ({ userId, signal }) => {
      const peer = this.getState().peers[userId]
      peer && peer.peerObject.signal(signal)
    }
    handleUsers = ({ initiator, users }) => {
      const { socket, dispatch, getState } = this
      const { peers } = getState()
  
      // TODO: request the username

      users
      .filter(user => !peers[user.id] && user.id !== socket.id)
      .forEach(user => dispatch(SimplePeerActions.createPeer({
        socket,
        user,
        initiator
      })))
    }
  }

const handshake = ({ socket }) => {
  return (dispatch, getState) => {
    const roomName = getState().app.chatRoomName
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
            type: actions.STATUS,
            status: actions.STATUS_ONLINE
          })
      })
      socket.on('disconnect', () => {
          dispatch({
            type: actions.STATUS,
            status: actions.STATUS_OFFLINE
          })
      })
  })
}

const initConnection = () => {
  return (dispatch, getState) => {
    const remoteServerUrl = getState().app.remoteServerUrl
    return dispatch({
      type: actions.INIT_CONNECTION,
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