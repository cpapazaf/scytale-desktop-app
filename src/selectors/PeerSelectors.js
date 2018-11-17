import { createSelector } from 'reselect'

export const getPeers = state => state.peers
export const getPeer = (state, id) => state.peers[id]
export const getPeerUsername = createSelector(
    getPeer,
    peer => peer.username
)
export const getPeerSharedSecret = createSelector(
    getPeer,
    peer => peer.sharedSecret
)
export const getPeerIds = createSelector(
    getPeers,
    peers => Object.keys(peers)
)