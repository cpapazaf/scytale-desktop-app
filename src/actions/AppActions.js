import * as types from '../constants/ActionTypes'
import { generatePublicKey } from '../utils/security'

export const setConfig = (username, chatRoomName, chatRoomPass, remoteServerUrl) => {
  return (dispatch) => {
    const { ecdh, publicKey } = generatePublicKey()
    dispatch({
      type: types.SET_CONFIG,
      payload: {
        username,
        chatRoomName,
        chatRoomPass,
        remoteServerUrl,
        ecdh,
        publicKey
      }
    })
  }
}

export const setView = (view) => ({
  type: types.SET_VIEW,
  payload: {
    view
  }
})