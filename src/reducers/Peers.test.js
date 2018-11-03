import { addPeer, removePeer, updatePeerInfo } from '../actions/SimplePeer'
import Peers from './Peers'

describe('reducers/Peers', () => {
    describe('addPeer', () => {
        it('adds a new peer', () => {
            let state = Peers()
            state = Peers(state, addPeer('bal', '12345'))
            expect(state['12345'].peerObject).toBe('bal')
        })
    })

    describe('removePeer', () => {
        it('removes a peer', () => {
            let state = Peers()
            state = Peers(state, addPeer('bla1', '12345'))
            state = Peers(state, addPeer('bla2', '123456'))
            state = Peers(state, removePeer('12345'))
            expect(Object.keys(state).length).toBe(1)
        })
    })

    describe('updatePeer', () => {
        it('updates a peer', () => {
            let state = Peers()
            state = Peers(state, addPeer('bla1', '12345'))
            state = Peers(state, addPeer('bla2', '123456'))
            state = Peers(state, updatePeerInfo('12345', 'user'))
            expect(state['12345'].username).toBe('user')
        })
    })
})