import { connect } from 'react-redux'
import ChatRoom from '../components/ChatRoom'
import { setView } from '../actions/AppActions'


const mapDispatchToProps = dispatch => ({
    setView: (view) => {
      dispatch(setView(view))
    }
  })

export const ChatRoomView = connect(() => ({}), mapDispatchToProps)(ChatRoom)
