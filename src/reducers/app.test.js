import {setView, setUsername, setChatRoomName, setRemoteServerUrl} from '../actions/App'
import app from './app'

describe('reducers/app', () => {
    describe('setView', () => {
        it('sets view to test', () => {
            const view = 'test'
            let state = app()
            state = app(state, setView(view))
            expect(state.currentView).toBe(view)
        })
    })

    describe('setUsername', () => {
        it('sets username to Bob', () => {
            const uname = 'Bob'
            let state = app()
            state = app(state, setUsername(uname))
            expect(state.username).toBe(uname)
        })
    })

    describe('setChatRoomName', () => {
        it('sets ChatRoomName to test', () => {
            const crname = 'test'
            let state = app()
            state = app(state, setChatRoomName(crname))
            expect(state.chatRoomName).toBe(crname)
        })
    })

    describe('setRemoteServerUrl', () => {
        it('sets RemoteServerUrl to http://something', () => {
            const serverUrl = 'http://something'
            let state = app()
            state = app(state, setRemoteServerUrl(serverUrl))
            expect(state.remoteServerUrl).toBe(serverUrl)
        })
    })
})