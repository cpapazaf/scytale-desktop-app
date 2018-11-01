import { combineReducers } from 'redux'
import messages from './messages'
import users from './users'
import app from './app'
import peers from './peers'

export default combineReducers({
  messages,
  users,
  app,
  peers
})