import crypto from 'crypto'

const IV_LENGTH = 16
export const encrypt = (text, secret) => {
    let iv = crypto.randomBytes(IV_LENGTH)
    let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(secret), iv)
    let encrypted = cipher.update(text)
  
    encrypted = Buffer.concat([encrypted, cipher.final()])
  
    return iv.toString('hex') + ':' + encrypted.toString('hex')
  }
  
export const hash = (text) => {
    return crypto.createHash("sha256").update(text).digest()
}

export const decrypt = (text, secret) => {
    let textParts = text.split(':')
    let iv = new Buffer(textParts.shift(), 'hex')
    let encryptedText = new Buffer(textParts.join(':'), 'hex')
    let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(secret), iv)
    let decrypted = decipher.update(encryptedText)

    decrypted = Buffer.concat([decrypted, decipher.final()])

    return decrypted.toString()
}

export const generatePublicKey = () => {
    const ecdh = crypto.createECDH('prime256v1')
    ecdh.generateKeys()

    return {
        ecdh,
        publicKey: ecdh.getPublicKey('hex')
    }
}

export const generateSharedSecretFromPublicKey = (myEcdh, peerPublicKey) => {
    return myEcdh.computeSecret(peerPublicKey, 'hex', 'hex').substring(0,32)
}