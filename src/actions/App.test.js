import { setView, setConfig } from './App'
import * as types from '../constants/ActionTypes'
import { getAction } from '../../test/utils/getAction'
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"

export const mockStore = configureMockStore([thunk])

describe('actions/App', () => {
    describe('setConfig', () => {
        it('sets Config', async () => {
            const uname = 'Bob'
            const roomname = 'bla'
            const serverUrl = 'http://bla'
            const store = mockStore();
            store.dispatch(setConfig(uname, roomname, serverUrl))
            const setConfigAction = await getAction(store, types.SET_CONFIG)
            expect(setConfigAction.type).toEqual(types.SET_CONFIG)
            expect(setConfigAction.username).toEqual(uname)
            expect(setConfigAction.chatRoomName).toEqual(roomname)
            expect(setConfigAction.remoteServerUrl).toEqual(serverUrl)
        })
    })
})