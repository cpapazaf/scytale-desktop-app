import * as types from '../constants/ActionTypes'
import { CHAT_CONFIG_VIEW } from '../constants/Views'
import { STATUS, STATUS_OFFLINE } from '../constants/ServerActions'

const App = (state = {
    currentView: CHAT_CONFIG_VIEW,
    status: STATUS_OFFLINE
  }, action) => {
    switch (action && action.type) {
      case types.SET_CONFIG:
        return Object.assign({}, state, {
          username: action.username,
          chatRoomName: action.chatRoomName,
          remoteServerUrl: action.remoteServerUrl,
          ecdh: action.ecdh,
          publicKey: action.publicKey
        })
      case types.SET_VIEW:
        return Object.assign({}, state, {
          currentView: action.view
        })
      case STATUS:
        return Object.assign({}, state, {
          status: action.status
        })
      default:
          return state
  }
}

export default App