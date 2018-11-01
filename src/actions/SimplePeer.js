import Peer from 'simple-peer'
import * as SimplePeerActionTypes from '../constants/SimplePeerActions'
import {addMessage, addUser} from './App'

class SimplePeerHandler {
  constructor ({ socket, user, dispatch, getState }) {
    this.socket = socket
    this.user = user
    this.dispatch = dispatch
    this.getState = getState
  }
  handleError = err => {
    const { dispatch, getState, user } = this
    const peer = getState().peers[user.id]
    peer && peer.destroy()
    dispatch(removePeer(user.id))
  }
  handleSignal = signal => {
    const { socket, user } = this
    const payload = { userId: user.id, signal }
    socket.emit('signal', payload)
  }
  handleConnect = () => {
    const { dispatch, user } = this
    dispatch(addUser(user.id, '-'))
  }
  handleData = object => {
    const { dispatch, user } = this
    object = JSON.parse(new window.TextDecoder('utf-8').decode(object))
    dispatch(addMessage(object.message, user.id))
  }
  handleClose = () => {
    const { dispatch, user } = this
    dispatch(removePeer(user.id))
  }
}

export function createPeer ({ socket, user, initiator }) {
  return (dispatch, getState) => {
    const userId = user.id

    const oldPeer = getState().peers[userId]
    if (oldPeer) {
      oldPeer.destroy()
      dispatch(removePeer(userId))
    }

    const peer = new Peer({
      initiator: socket.id === initiator,
      config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }] },
      // Allow the peer to receive video, even if it's not sending stream:
      // https://github.com/feross/simple-peer/issues/95
      offerConstraints: {
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      }
    })

    const handler = new SimplePeerHandler({
      socket,
      user,
      dispatch,
      getState
    })

    peer.once(SimplePeerActionTypes.PEER_EVENT_ERROR, handler.handleError)
    peer.once(SimplePeerActionTypes.PEER_EVENT_CONNECT, handler.handleConnect)
    peer.once(SimplePeerActionTypes.PEER_EVENT_CLOSE, handler.handleClose)
    peer.on(SimplePeerActionTypes.PEER_EVENT_SIGNAL, handler.handleSignal)
    peer.on(SimplePeerActionTypes.PEER_EVENT_DATA, handler.handleData)

    dispatch(addPeer({ peer, userId }))
  }
}

export const addPeer = ({ peer, userId }) => ({
  type: SimplePeerActionTypes.PEER_ADD,
  payload: { peer, userId }
})

export const removePeer = userId => ({
  type: SimplePeerActionTypes.PEER_REMOVE,
  payload: { userId }
})

export const destroyPeers = () => ({
  type: SimplePeerActionTypes.PEERS_DESTROY
})

export const sendMessage = message => (dispatch, getState) => {
  message = JSON.stringify({ message })
  const { peers } = getState()
  for (const peer of Object.keys(peers)){
    peers[peer].send(message)
  }
}