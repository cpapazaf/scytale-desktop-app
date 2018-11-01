import * as types from '../constants/SimplePeerActions'

const peers = (state = {}, action) => {
  switch (action && action.type) {
    case types.PEER_ADD:
      return {
        ...state,
        [action.payload.userId]: action.payload.peer
      } 
    case types.PEER_REMOVE:
      return state.filter(({ userId }) => userId !== action.payload.userId)
    case types.PEERS_DESTROY:
      state.forEach(peer => peer.destroy())
      return {}
    default:
      return state
  }
}

export default peers