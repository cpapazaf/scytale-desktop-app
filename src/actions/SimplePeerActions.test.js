import { addReceivedMessage } from './SimplePeerActions'
import * as types from '../constants/ActionTypes'
import { getAction } from '../../test/utils/getAction'
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"

export const mockStore = configureMockStore([thunk])

describe('actions/SimplePeerActions', () => {
    it('addReceivedMessage', async () => {
        const store = mockStore()
        store.dispatch(addReceivedMessage('message', 'testAuthor'))
        const addReceivedMessageAction = await getAction(store, types.MESSAGE_ADD)
        expect(addReceivedMessageAction.type).toEqual(types.MESSAGE_ADD)
        expect(addReceivedMessageAction.payload.message).toEqual('message')
        expect(addReceivedMessageAction.payload.author).toEqual('testAuthor')
    })
})