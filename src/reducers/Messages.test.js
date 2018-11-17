import { addMessage } from '../actions/SimplePeerActions'
import Messages from './Messages'

describe('reducers/Messages', () => {
    describe('addMessage', () => {
        it('adds a new message to the list', () => {
            const realDateNow = Date.now.bind(global.Date)
            const dateNowStub = jest.fn(() => 1530518207007)
            global.Date.now = dateNowStub
            
            let state = Messages()
            state = Messages(state, addMessage('test', 'Bob'))
            expect(state[0].author).toBe('Bob')
            expect(state[0].timestamp).toBe(1530518207007)

            global.Date.now = realDateNow
        })

        it('adds several message to the list', () => {
            const realDateNow = Date.now.bind(global.Date)
            let dateNowStub = jest.fn(() => 1530518207007)
            global.Date.now = dateNowStub    

            let state = Messages()
            state = Messages(state, addMessage('test', 'Bob'))

            dateNowStub = jest.fn(() => 1530518207009)
            global.Date.now = dateNowStub    

            state = Messages(state, addMessage('test2', 'Cat'))
            expect(state[0].author).toBe('Bob')
            expect(state[0].timestamp).toBe(1530518207007)
            expect(state[1].author).toBe('Cat')
            expect(state[1].timestamp).toBe(1530518207009)

            global.Date.now = realDateNow
        })
    })
})