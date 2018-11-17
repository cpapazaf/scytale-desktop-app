import { getPeerUsername, getPeerSharedSecret, getPeerIds } from './PeerSelectors'

const state = {
    peers: {
       '1': {
            username: 'test',
            sharedSecret: 'testSharedSecret',
       },
       '2': {
            username: 'test2',
            sharedSecret: 'testSharedSecret2',    
        }    
    }
}

describe('selectors/PeerSelector', () => {
    it('gets the username', async () => {
        expect(getPeerUsername(state, '1')).toEqual('test')
    }),
    it('gets the sharedSecret', async () => {
        expect(getPeerSharedSecret(state, 1)).toEqual('testSharedSecret')
    }),
    it('gets the peerIds', async () => {
        expect(getPeerIds(state, 1)).toEqual(['1','2'])
    })
})