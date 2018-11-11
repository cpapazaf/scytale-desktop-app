# Scytale desktop clients

## Status

[![Build Status](https://travis-ci.org/cpapazaf/scytale-desktop-app.svg?branch=master)](https://travis-ci.org/cpapazaf/scytale-desktop-app)

## Security

Every message is encrypted using ECDH (prime256v1) with SHA256 (aes-256-cbc). It can only be decrypted by your private key. Keys are created on the fly and kept in mem (state)

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
