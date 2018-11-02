import * as types from '../constants/ActionTypes'
import { CHAT_CONFIG_VIEW } from '../constants/Views'
import { STATUS, STATUS_OFFLINE } from '../constants/ServerActions'

const App = (state = {
    currentView: CHAT_CONFIG_VIEW,
    status: STATUS_OFFLINE
  }, action) => {
    switch (action && action.type) {
      case types.ADD_USERNAME:
        return Object.assign({}, state, {
          username: action.username
        })
      case types.SET_VIEW:
        return Object.assign({}, state, {
          currentView: action.view
        })
      case STATUS:
        return Object.assign({}, state, {
          status: action.status
        })
      case types.SET_CHAT_ROOM_NAME:
        return Object.assign({}, state, {
          chatRoomName: action.chatRoomName
        })
      case types.SET_REMOTE_SERVER_URL:
        return Object.assign({}, state, {
          remoteServerUrl: action.remoteServerUrl
        })
      default:
          return state
  }
}

export default App