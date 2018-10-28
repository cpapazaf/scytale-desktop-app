import { connect } from 'react-redux'
import MessagesListComponent from '../components/MessagesList'

export const Messages = connect(state => ({
  messages: state.messages
}), {})(MessagesListComponent)
