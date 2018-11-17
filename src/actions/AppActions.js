import * as types from '../constants/ActionTypes'
import { generatePublicKey } from '../utils/security'

export const setConfig = (username, chatRoomName, remoteServerUrl) => {
  return (dispatch, getState) => {
    const { ecdh, publicKey } = generatePublicKey()
    dispatch({
      type: types.SET_CONFIG,
      username,
      chatRoomName,
      remoteServerUrl,
      ecdh: ecdh,
      publicKey: publicKey
    })
  }

}

export const setView = (view) => ({
  type: types.SET_VIEW,
  view
})