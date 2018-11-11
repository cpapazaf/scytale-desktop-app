import * as types from '../constants/ActionTypes'
import crypto from 'crypto'

export const setConfig = (username, chatRoomName, remoteServerUrl) => {
  return (dispatch, getState) => {
    const ecdh = crypto.createECDH('prime256v1')
    ecdh.generateKeys()
    dispatch({
      type: types.SET_CONFIG,
      username,
      chatRoomName,
      remoteServerUrl,
      ecdh: ecdh,
      publicKey: ecdh.getPublicKey('hex')
    })
  }

}

export const setView = (view) => ({
  type: types.SET_VIEW,
  view
})