import Peer from 'simple-peer'
import * as types from '../constants/ActionTypes'
import * as SimplePeerConstants from '../constants/SimplePeerConstants'
import { getPeer, getPeerUsername, getPeerSharedSecret, getPeerIds } from '../selectors/PeerSelectors'
import { getUsername, getPublicKey, getEcdh } from '../selectors/AppSelectors'
import { encrypt, decrypt, hash, generateSharedSecretFromPublicKey } from '../utils/security'

class SimplePeerHandler {
  constructor ({ socket, user, dispatch, getState }) {
    this.socket = socket
    this.user = user
    this.dispatch = dispatch
    this.getState = getState
  }
  handleError = err => {
    const { dispatch, getState, user } = this
    const peer = getPeer(getState(), user.id)
    peer && peer.peerObject.destroy()
    dispatch(removePeer(user.id))
  }
  handleSignal = signal => {
    const { socket, user } = this
    const payload = { userId: user.id, signal }
    socket.emit('signal', payload)
  }
  handleConnect = () => {
    const { user, getState, socket } = this
    // Peer connected, send public key and name
    const state = getState()
    const peer = getPeer(state, user.id)
    peer.peerObject.send(JSON.stringify({ 
      socketId: socket.id,
      name: getUsername(state),
      publicKey: getPublicKey(state)
    }))
  }
  handleData = object => {
    const { dispatch, user, getState } = this
    const state = getState()
    object = JSON.parse(new window.TextDecoder('utf-8').decode(object))
    if (object.socketId) {
      const ecdh = getEcdh(state)
      // We received the internal handshake lets calculate the secret and keep only 32 leftmost chars
      const sharedSecret = generateSharedSecretFromPublicKey(ecdh, object.publicKey)
      dispatch(updatePeerInfo(object.socketId, object.name, object.publicKey, sharedSecret))
    }
    if (object.message) {
      const decryptedMessage = decrypt(object.message, getPeerSharedSecret(state, user.id))
      const hashOfDecryptedMessage = hash(decryptedMessage)
      if (arraysEqual(object.hash.data, hashOfDecryptedMessage)) {
        dispatch(addMessage(decryptedMessage, getPeerUsername(state, user.id)))
      } else {
        dispatch(addMessage('Incomming Message Hash is not correct. Possible Security breach! Restart Communication in a new Room', 'Scytale App'))
      }
    }
  }
  handleClose = () => {
    const { dispatch, user } = this
    dispatch(removePeer(user.id))
  }
}

export function createPeer ({ socket, user, initiator }) {
  return (dispatch, getState) => {
    const userId = user.id

    const oldPeer = getPeer(getState(), userId)
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

    peer.once(SimplePeerConstants.PEER_EVENT_ERROR, handler.handleError)
    peer.once(SimplePeerConstants.PEER_EVENT_CONNECT, handler.handleConnect)
    peer.once(SimplePeerConstants.PEER_EVENT_CLOSE, handler.handleClose)
    peer.on(SimplePeerConstants.PEER_EVENT_SIGNAL, handler.handleSignal)
    peer.on(SimplePeerConstants.PEER_EVENT_DATA, handler.handleData)

    dispatch(addPeer(peer, userId))
  }
}

const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export const addPeer = (peer, userId) => ({
  type: types.PEER_ADD,
  payload: { peer, userId }
})

export const removePeer = userId => ({
  type: types.PEER_REMOVE,
  payload: { userId }
})

export const updatePeerInfo = (userId, username, publicKey, sharedSecret) => ({
  type: types.PEER_UPDATE,
  payload: { userId, username, publicKey, sharedSecret }
})

export const addMessage = (message, author) => ({
  type: types.ADD_MESSAGE,
  payload: {
    timestamp: Date.now(),
    message,
    author
  }
})

export const sendMessage = (message) => (dispatch, getState) => {
  const state = getState()
  for (const peerId of getPeerIds(state)){
    const encryptedMessage = encrypt(message, getPeerSharedSecret(state, peerId))
    const hashOfOriginalMessage = hash(message)
    getPeer(state, peerId).peerObject.send(JSON.stringify({ message: encryptedMessage, hash: hashOfOriginalMessage }))
  }
  dispatch(addMessage(message, getUsername(state)))
}
