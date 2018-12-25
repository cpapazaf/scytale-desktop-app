import { getChatRoomName } from '../selectors/AppSelectors'
import { getPeer } from '../selectors/PeerSelectors'
import * as SimplePeerActions from '../actions/SimplePeerActions'

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

export const handshake = ({ socket }) => {
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