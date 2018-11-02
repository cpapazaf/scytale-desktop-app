import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ChatRoomConfig from '../components/ChatRoomConfig'
import { setUsername, setView, setChatRoomName, setRemoteServerUrl } from '../actions/App'
import * as ServerActions from '../actions/Server'

const mapDispatchToProps = dispatch => ({
  updateUsername: (username) => {
    dispatch(setUsername(username))
  },
  setChatRoomName: (chatRoomName) => {
    dispatch(setChatRoomName(chatRoomName))
  },
  setRemoteServerUrl: (remoteServer) => {
    dispatch(setRemoteServerUrl(remoteServer))
  },
  setView: (view) => {
    dispatch(setView(view))
  },
  initConnection: bindActionCreators(ServerActions.init, dispatch)
})

export const ChatRoomConfigView = connect(() => ({}), mapDispatchToProps)(ChatRoomConfig)
