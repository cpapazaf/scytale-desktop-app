import * as types from '../constants/ActionTypes'

let nextMessageId = 0

export const addMessage = (message, author) => ({
  type: types.ADD_MESSAGE,
  id: nextMessageId++,
  timestamp: Date.now(),
  message,
  author
})

export const addUser = (id, name) => ({
  type: types.ADD_USER,
  id,
  name
})

export const addUsername = (username) => ({
  type: types.ADD_USERNAME,
  username
})

export const setChatRoomName = (chatRoomName) => ({
  type: types.SET_CHAT_ROOM_NAME,
  chatRoomName
})

export const setView = (view) => ({
  type: types.SET_VIEW,
  view
})

export const setRemoteServerUrl= (remoteServerUrl) => ({
  type: types.SET_REMOTE_SERVER_URL,
  remoteServerUrl
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
