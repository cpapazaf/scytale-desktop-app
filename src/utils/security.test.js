import {encrypt, decrypt} from './security'

describe('utils/security', () => {
    it('ensure what is encrypted is properly decrypted', async () => {
        const encryptedMessage = encrypt('test', '65ec82e60e054920359e82c32ea33873')
        expect(decrypt(encryptedMessage, '65ec82e60e054920359e82c32ea33873')).toEqual('test')
    })
})