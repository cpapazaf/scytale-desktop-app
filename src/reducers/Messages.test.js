import { addReceivedMessage } from '../actions/SimplePeerActions'
import * as types from '../constants/ActionTypes'
import { getAction } from '../../test/utils/getAction'
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"

export const mockStore = configureMockStore([thunk])

describe('reducers/Messages', () => {
  describe('CRUD', () => {
    it('adds a new message to the list', async () => {
      const realDateNow = Date.now.bind(global.Date)
      const dateNowStub = jest.fn(() => 1530518207007)
      global.Date.now = dateNowStub
      const store = mockStore()
      store.dispatch(addReceivedMessage('message', 'testAuthor'))
      const addReceivedMessageAction = await getAction(store, types.MESSAGE_ADD)
      expect(addReceivedMessageAction.type).toEqual(types.MESSAGE_ADD)
      expect(addReceivedMessageAction.payload.message).toEqual('message')
      expect(addReceivedMessageAction.payload.author).toEqual('testAuthor')
      expect(addReceivedMessageAction.payload.timestamp).toBe(1530518207007)

      global.Date.now = realDateNow
    })
  })
})