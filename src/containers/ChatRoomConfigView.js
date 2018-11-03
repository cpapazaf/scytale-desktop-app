import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ChatRoomConfig from '../components/ChatRoomConfig'
import { setConfig, setView } from '../actions/App'
import * as ServerActions from '../actions/Server'

const mapDispatchToProps = dispatch => ({
  setConfig: (username, chatRoomName, remoteServer) => {
    dispatch(setConfig(username, chatRoomName, remoteServer))
  },
  setView: (view) => {
    dispatch(setView(view))
  },
  initConnection: bindActionCreators(ServerActions.init, dispatch)
})

export const ChatRoomConfigView = connect(() => ({}), mapDispatchToProps)(ChatRoomConfig)
