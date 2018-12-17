# Scytale desktop clients

## Status

[![Build Status](https://travis-ci.org/cpapazaf/scytale-desktop-app.svg?branch=master)](https://travis-ci.org/cpapazaf/scytale-desktop-app)

## Security

* Keys are generated using ECDH (prime256v1).
* Encryption is performed with SHA256 (aes-256-cbc).
* The shared secret is calculated like:
  ```js
  const sharedSecret = ecdh.computeSecret(remoteUser.publicKey, 'hex', 'hex').substring(0,32)
  ```
* A hash `sha256` of the original message is sent together with the encrypted message. 

Check [safecurves](http://safecurves.cr.yp.to/)

## Dev

```bash
# Install dependencies
npm install
# Run the app in dev mode
npm run electron-dev
```

### Test

```bash
npm test --watchAll
```
