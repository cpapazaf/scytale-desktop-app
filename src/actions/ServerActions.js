import io from 'socket.io-client'
import * as types from '../constants/ActionTypes'
import {STATUS_OFFLINE, STATUS_ONLINE} from '../constants/ServerConstants'
import { getRemoteServerUrl } from '../selectors/AppSelectors'
import { handshake } from '../remote/SocketHandler'

const connect = (remoteServerUrl) => dispatch => {
  const socket = io.connect(remoteServerUrl, {reconnect: true})
  return new Promise(resolve => {
      socket.once('connect', () => {
          resolve(socket)
      })
      socket.on('connect', () => {
          dispatch({
            type: types.STATUS,
            payload: {
              status: STATUS_ONLINE
            }
          })
      })
      socket.on('disconnect', () => {
          dispatch({
            type: types.STATUS,
            payload: {
              status: STATUS_OFFLINE
            }
          })
      })
  })
}

const initConnection = () => {
  return (dispatch, getState) => {
    const remoteServerUrl = getRemoteServerUrl(getState())
    return dispatch({
      type: types.INIT_CONNECTION,
      payload: connect(remoteServerUrl)(dispatch)
              .then((socket) => {
                  dispatch(handshake({
                      socket
                  }))
              })
    })
  }
}

export const init = () => dispatch => {
  return dispatch(initConnection())
}