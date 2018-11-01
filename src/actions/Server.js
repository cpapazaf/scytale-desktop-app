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
      peer && peer.signal(signal)
    }
    handleUsers = ({ initiator, users }) => {
      const { socket, dispatch, getState } = this
      const peers = getState().peers
  
      users
      .filter(user => !peers[user.id] && user.id !== socket.id)
      .forEach(user => dispatch(SimplePeerActions.createPeer({
        socket,
        user,
        initiator
      })))
    }
  }

function handshake ({ socket }) {
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

export const init = () => dispatch => {
    return dispatch({
        type: actions.INIT_CONNECTION,
        payload: connect()(dispatch)
                .then((socket) => {
                    dispatch(handshake({
                        socket
                    }))
                })
    })
}

const connect = () => dispatch => {
    const socket = io.connect('http://localhost:4000', {reconnect: true})
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