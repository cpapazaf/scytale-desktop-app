import Peer from 'simple-peer'
import * as SimplePeerActionTypes from '../constants/SimplePeerActions'

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
    peer && peer.peerObject.destroy()
    dispatch(removePeer(user.id))
  }
  handleSignal = signal => {
    const { socket, user } = this
    const payload = { userId: user.id, signal }
    socket.emit('signal', payload)
  }
  handleConnect = () => {
    // const { dispatch, user } = this
    // TODO: Update Peer Status
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
      oldPeer.peerObject.destroy()
      dispatch(removePeer(userId))
    }

    const peer = new Peer({
      initiator: socket.id === initiator,
      config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }] },
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

    dispatch(addPeer(peer, userId))
  }
}

export const addPeer = (peer, userId) => ({
  type: SimplePeerActionTypes.PEER_ADD,
  payload: { peer, userId }
})

export const removePeer = userId => ({
  type: SimplePeerActionTypes.PEER_REMOVE,
  payload: { userId }
})

export const addMessage = (message, author) => ({
  type: SimplePeerActionTypes.ADD_MESSAGE,
  timestamp: Date.now(),
  message,
  author
})

export const sendMessage = (message) => (dispatch, getState) => {
  const { peers, app } = getState()
  for (const peer of Object.keys(peers)){
    peers[peer].peerObject.send(JSON.stringify({ message }))
  }
  dispatch(addMessage(message, app.username))
}