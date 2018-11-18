import * as types from '../constants/ActionTypes'
import { CHAT_CONFIG_VIEW } from '../constants/ViewsConstants'
import { STATUS_OFFLINE } from '../constants/ServerConstants'

const App = (state = {
    currentView: CHAT_CONFIG_VIEW,
    status: STATUS_OFFLINE
  }, action) => {
    switch (action && action.type) {
      case types.SET_CONFIG:
        return Object.assign({}, state, {
          username: action.payload.username,
          chatRoomName: action.payload.chatRoomName,
          remoteServerUrl: action.payload.remoteServerUrl,
          ecdh: action.payload.ecdh,
          publicKey: action.payload.publicKey
        })
      case types.SET_VIEW:
        return Object.assign({}, state, {
          currentView: action.payload.view
        })
      case types.STATUS:
        return Object.assign({}, state, {
          status: action.payload.status
        })
      default:
          return state
  }
}

export default App