import * as types from '../constants/ActionTypes'

let nextMessageId = 0

export const addMessage = (message, author) => ({
  type: types.ADD_MESSAGE,
  id: nextMessageId++,
  timestamp: Date.now(),
  message,
  author
})

export const addUsername = (username) => ({
  type: types.ADD_USERNAME,
  username
})

export const setView = (view) => ({
  type: types.SET_VIEW,
  view
})

export const messageReceived = (message, author) => ({
  type: types.MESSAGE_RECEIVED,
  id: nextMessageId++,
  timestamp: Date.now(),
  message,
  author
})

export const populateUsersList = users => ({
  type: types.USERS_LIST,
  timestamp: Date.now(),
  users
})
