import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ChatRoomConfig from '../components/ChatRoomConfig'
import { setConfig, setView } from '../actions/AppActions'
import * as ServerActions from '../actions/ServerActions'

const mapDispatchToProps = dispatch => ({
  setConfig: (username, chatRoomName, chatRoomPass, remoteServer) => {
    dispatch(setConfig(username, chatRoomName, chatRoomPass, remoteServer))
  },
  setView: (view) => {
    dispatch(setView(view))
  },
  initConnection: bindActionCreators(ServerActions.init, dispatch)
})

export const ChatRoomConfigView = connect(() => ({}), mapDispatchToProps)(ChatRoomConfig)
