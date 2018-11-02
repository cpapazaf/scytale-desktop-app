import { combineReducers } from 'redux'
import Messages from './Messages'
import App from './App'
import Peers from './Peers'

export default combineReducers({
  messages: Messages,
  app: App,
  peers: Peers
})