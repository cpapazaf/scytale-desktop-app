import * as types from '../constants/SimplePeerActions'

const Peers = (state = {}, action) => {
  switch (action && action.type) {
    case types.PEER_ADD:
      return {
        ...state,
        [action.payload.userId]: {
          peerObject: action.payload.peer,
          name: action.payload.name
        }
      } 
    case types.PEER_REMOVE:
      return state.filter(({ userId }) => userId !== action.payload.userId)
    case types.PEERS_DESTROY:
      state.forEach(peer => peer.peerObject.destroy())
      return {}
    case types.PEERS_LIST:
      return state
    default:
      return state
  }
}

export default Peers