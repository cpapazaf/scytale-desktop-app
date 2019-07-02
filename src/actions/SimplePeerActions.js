import Peer from 'simple-peer'
import * as SimplePeerConstants from '../constants/SimplePeerConstants'
import { SimplePeerHandler } from '../remote/SimplePeerHandler'
import * as types from '../constants/ActionTypes'
import { getPeer, getPeerSharedSecret, getPeerIds } from '../selectors/PeerSelectors'
import { getUsername } from '../selectors/AppSelectors'
import { uuidv4 } from '../utils'
import { encrypt, hash } from '../utils/security'

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

export const addReceivedMessage = (message, author)=> (dispatch, getState) => {
  const messageToDispatch = {
    type: types.MESSAGE_ADD,
    payload: {
      timestamp: Date.now(),
      mid: uuidv4(),
      message,
      author
    }
  }
  setTimeout(() => ( dispatch({
    type: types.MESSAGE_DELETE,
    payload: {
      mid: messageToDispatch.payload.mid
    }
  }) ), 60 * 1000)
  dispatch(messageToDispatch)
}

export const sendMessage = (message) => (dispatch, getState) => {
  const state = getState()
  for (const peerId of getPeerIds(state)){
    const encryptedMessage = encrypt(message, getPeerSharedSecret(state, peerId))
    const hashOfOriginalMessage = hash(message)
    getPeer(state, peerId).peerObject.send(JSON.stringify({ message: encryptedMessage, hash: hashOfOriginalMessage }))
  }
  dispatch(addReceivedMessage(message, getUsername(state)))
}
