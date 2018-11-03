import { setView, setConfig } from '../actions/App'
import App from './App'

describe('reducers/App', () => {
    describe('setView', () => {
        it('sets view to test', () => {
            const view = 'test'
            let state = App()
            state = App(state, setView(view))
            expect(state.currentView).toBe(view)
        })
    })

    describe('setConfig', () => {
        it('sets Config', () => {
            const uname = 'Bob'
            const roomname = 'bla'
            const serverUrl = 'http://bla'
            let state = App()
            state = App(state, setConfig(uname, roomname, serverUrl))
            expect(state.username).toBe(uname)
            expect(state.chatRoomName).toBe(roomname)
            expect(state.remoteServerUrl).toBe(serverUrl)
        })
    })
})