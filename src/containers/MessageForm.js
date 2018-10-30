import { connect } from 'react-redux'
import MessageInputComponent from '../components/MessageInput'
import { addMessage } from '../actions'

const mapStateToProps = (state) => {
  return {
    username: state.app.username
  }
}

const mapDispatchToProps = dispatch => ({
  updateMessage: (message, author) => {
    dispatch(addMessage(message, author))
  }
})

export const MessageForm = connect(mapStateToProps, mapDispatchToProps)(MessageInputComponent)
