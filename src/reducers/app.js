import * as types from '../constants/ActionTypes'
import { CHAT_CONFIG_VIEW } from '../constants/ViewsConstants'
import { STATUS_OFFLINE, STATUS_ONLINE } from '../constants/ServerConstants'

const App = (state = {
    currentView: CHAT_CONFIG_VIEW,
    status: STATUS_OFFLINE
  }, action) => {
    switch (action && action.type) {
      case types.SET_CONFIG:
        return Object.assign({}, state, {
          username: action.payload.username,
          chatRoomName: action.payload.chatRoomName,
          chatRoomPass: action.payload.chatRoomPass,
          remoteServerUrl: action.payload.remoteServerUrl,
          ecdh: action.payload.ecdh,
          publicKey: action.payload.publicKey
        })
      case types.SET_VIEW:
        if (action.payload.view === CHAT_CONFIG_VIEW) {
          return Object.assign({}, {}, {
            currentView: CHAT_CONFIG_VIEW,
            status: STATUS_OFFLINE
          })
        }
        return Object.assign({}, state, {
          currentView: action.payload.view
        })
      case types.STATUS:
        const new_state = Object.assign({}, state, {
          status: action.payload.status
        })

        if (action.payload.status === STATUS_ONLINE) {
          delete new_state.serverError
        }

        return new_state 
      case types.SERVER_ERROR:
        return Object.assign({}, state, {
          serverError: action.payload.message
        })
      case types.SERVER_EXCEPTION:
        return Object.assign({}, state, {
          serverException: action.payload.message
        })
      default:
          return state
  }
}

export default App