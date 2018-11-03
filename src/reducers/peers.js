import * as types from '../constants/SimplePeerActions'

const Peers = (state = {}, action) => {
  switch (action && action.type) {
    case types.PEER_ADD:
      return {
        ...state,
        [action.payload.userId]: {
          peerObject: action.payload.peer
        }
      } 
    case types.PEER_REMOVE:
      let newState = Object.assign({}, state)
      delete newState[action.payload.userId]
      return newState
    case types.PEER_UPDATE:
      let newUpdatedState = Object.assign({}, state)
      newUpdatedState[action.payload.userId].username = action.payload.username
      return newUpdatedState
    default:
      return state
  }
}

export default Peers