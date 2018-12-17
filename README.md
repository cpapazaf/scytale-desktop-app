# Scytale desktop clients

[Scytale](https://en.wikipedia.org/wiki/Scytale) is a simple P2P chat application that focuses on security, simplicity and e2e user ownership. The intention of this app is not to replace the already existing and popular messaging applications. It is targeting the users who want a secure, dependency-free and fully owned application with a simple interface for exchanging snap messsages.

The client application requires a [backend service](https://github.com/cpapazaf/scytale-server) for exchanging [ICE](https://en.wikipedia.org/wiki/Interactive_Connectivity_Establishment) information. It is advised to create your own server on heroku since the default one is for demo purposes (only) and is not maintained.

## Status

[![Build Status](https://travis-ci.org/cpapazaf/scytale-desktop-app.svg?branch=master)](https://travis-ci.org/cpapazaf/scytale-desktop-app)

## Security

* Keys are generated using `ECDH` (prime256v1).
* E2E encryption is performed by `SHA256` (aes-256-cbc).
* The shared secret is calculated like:
  ```js
  const sharedSecret = ecdh.computeSecret(remoteUser.publicKey, 'hex', 'hex').substring(0,32)
  ```
* A hash `sha256` of the original message is sent together with the encrypted message. 

Check [safecurves](http://safecurves.cr.yp.to/)

## Dev

Clone the [backend service](https://github.com/cpapazaf/scytale-server) and start it locally.

```bash
# Install dependencies
npm install
# Run the app in dev mode
npm run electron-dev
```

Open your browser and point two tabs to: `http://localhost:3000`. Pick a random string for chatroom and connect both clients. :)

### Unit Test

```bash
npm test --watchAll
```

### E2E Test

```bash
npm test:e2e
```
