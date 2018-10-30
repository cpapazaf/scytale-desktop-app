import * as types from '../constants/ActionTypes'
import {CHAT_CONFIG_VIEW} from '../constants/Views'

const app = (state = {
  currentView: CHAT_CONFIG_VIEW
}, action) => {
  switch (action.type) {
    case types.ADD_USERNAME:
      return Object.assign({}, state, {
        username: action.username
      })
    case types.SET_VIEW:
      return Object.assign({}, state, {
        currentView: action.view
      })
    default:
        return state
  }
}

export default app