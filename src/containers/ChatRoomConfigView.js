import { connect } from 'react-redux'
import ChatRoomConfig from '../components/ChatRoomConfig'
import { addUsername, setView } from '../actions'

const mapDispatchToProps = dispatch => ({
  updateUsername: (username) => {
    dispatch(addUsername(username))
  },
  setView: (view) => {
    dispatch(setView(view))
  }
})

export const ChatRoomConfigView = connect(() => ({}), mapDispatchToProps)(ChatRoomConfig)
