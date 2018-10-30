import { combineReducers } from 'redux'
import messages from './messages'
import users from './users'
import app from './app'

export default combineReducers({
  messages,
  users,
  app
})