import { getPeer, getPeerUsername, getPeerSharedSecret } from '../selectors/PeerSelectors'
import { getUsername, getPublicKey, getEcdh } from '../selectors/AppSelectors'
import { removePeer, updatePeerInfo, addReceivedMessage} from '../actions/SimplePeerActions'
import { arraysEqual } from '../utils'
import { decrypt, hash, generateSharedSecretFromPublicKey } from '../utils/security'

export class SimplePeerHandler {
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
          dispatch(addReceivedMessage(decryptedMessage, getPeerUsername(state, user.id)))
        } else {
          dispatch(addReceivedMessage('Incomming Message Hash is not correct. Possible Security breach! Restart Communication in a new Room', 'Scytale App'))
        }
      }
    }
    handleClose = () => {
      const { dispatch, user } = this
      dispatch(removePeer(user.id))
    }
  }