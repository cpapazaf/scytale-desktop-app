export const getView = state => state.app.currentView
export const getChatRoomName = state => state.app.chatRoomName
export const getChatRoomPass = state => state.app.chatRoomPass
export const getUsername = state => state.app.username
export const getStatus = state => state.app.status
export const getServerError = state => state.app.serverError || ''
export const getPublicKey = state => state.app.publicKey
export const getEcdh = state => state.app.ecdh
export const getRemoteServerUrl = state => state.app.remoteServerUrl
export const getServerException = state => state.app.serverException || ''
