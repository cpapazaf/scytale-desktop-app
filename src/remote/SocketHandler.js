import { getChatRoomName, getChatRoomPass } from '../selectors/AppSelectors'
import { getPeer } from '../selectors/PeerSelectors'
import * as SimplePeerActions from '../actions/SimplePeerActions'
import { setException } from '../actions/ServerActions'

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
    handleException = (exception) => {
      const { dispatch } = this
      if (exception.errorMessage) {
        dispatch(setException(exception.errorMessage))
      }
    }
  }

export const handshake = ({ socket }) => {
  return (dispatch, getState) => {
    const roomName = getChatRoomName(getState())
    const roomPass = getChatRoomPass(getState())
    const handler = new SocketHandler({
      socket,
      roomName,
      dispatch,
      getState
    })

    socket.on('signal', handler.handleSignal)
    socket.on('users', handler.handleUsers)
    socket.on('exception', handler.handleException)
    socket.emit('ready', roomName, roomPass)
  }
}