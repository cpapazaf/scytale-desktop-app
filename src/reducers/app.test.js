import { setView, setConfig } from '../actions/AppActions'
import App from './App'

import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"

export const mockStore = configureMockStore([thunk])

describe('reducers/App', () => {
    describe('setView', () => {
        it('sets view to test', () => {
            const view = 'test'
            let state = App()
            state = App(state, setView(view))
            expect(state.currentView).toBe(view)
        })
    })
})