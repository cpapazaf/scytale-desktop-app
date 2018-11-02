import * as types from '../constants/ActionTypes'

export const setUsername = (username) => ({
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