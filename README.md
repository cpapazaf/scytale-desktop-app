# Scytale desktop clients

## Status

[![Build Status](https://travis-ci.org/cpapazaf/scytale-desktop-app.svg?branch=master)](https://travis-ci.org/cpapazaf/scytale-desktop-app)

## Security

Every message is encrypted using ECDH with SHA256. It can only be decrypted by your private key. Keys are created on the fly and kept in mem (state)

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
