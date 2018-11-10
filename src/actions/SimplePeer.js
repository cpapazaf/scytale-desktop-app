import Peer from 'simple-peer'
import * as SimplePeerActionTypes from '../constants/SimplePeerActions'
import crypto from 'crypto'

const IV_LENGTH = 16

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
    const { user, getState, socket } = this
    // Peer connected, send public key and name
    const peer = getState().peers[user.id]
    const { username, publicKey } = getState().app
    peer.peerObject.send(JSON.stringify({ 
      socketId: socket.id,
      name: username,
      publicKey: publicKey
    }))
  }
  handleData = object => {
    const { dispatch, user, getState } = this
    object = JSON.parse(new window.TextDecoder('utf-8').decode(object))
    if (object.socketId) {
      const { ecdh } = getState().app
      // We received the internal handshake lets calculate the secret and keep only 32 leftmost chars
      const sharedSecret = ecdh.computeSecret(object.publicKey, 'hex', 'hex').substring(0,32)
      dispatch(updatePeerInfo(object.socketId, object.name, object.publicKey, sharedSecret))
    }
    if (object.message) {
      const { peers } = getState()
      const decryptedMessage = decrypt(object.message, peers[user.id].sharedSecret)
      dispatch(addMessage(decryptedMessage, peers[user.id].username))
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

export const updatePeerInfo = (userId, username, publicKey, sharedSecret) => ({
  type: SimplePeerActionTypes.PEER_UPDATE,
  payload: { userId, username, publicKey, sharedSecret }
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
    const encryptedMessage = encrypt(message, peers[peer].sharedSecret)
    peers[peer].peerObject.send(JSON.stringify({ message: encryptedMessage }))
  }
  dispatch(addMessage(message, app.username))
}

const encrypt = (text, secret) => {
  let iv = crypto.randomBytes(IV_LENGTH)
  let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(secret), iv)
  let encrypted = cipher.update(text)

  encrypted = Buffer.concat([encrypted, cipher.final()])

  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

const decrypt = (text, secret) => {
  let textParts = text.split(':')
  let iv = new Buffer(textParts.shift(), 'hex')
  let encryptedText = new Buffer(textParts.join(':'), 'hex')
  let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(secret), iv)
  let decrypted = decipher.update(encryptedText)

  decrypted = Buffer.concat([decrypted, decipher.final()])

  return decrypted.toString()
}
