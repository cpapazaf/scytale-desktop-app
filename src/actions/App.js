import * as types from '../constants/ActionTypes'

export const setConfig = (username, chatRoomName, remoteServerUrl) => ({
  type: types.SET_CONFIG,
  username,
  chatRoomName,
  remoteServerUrl
})

export const setView = (view) => ({
  type: types.SET_VIEW,
  view
})