import { connect } from 'react-redux'
import MessagesListComponent from '../components/MessagesList'
import { getMessages } from '../selectors/MessagesSelector'

export const Messages = connect(state => ({
  messages: getMessages(state)
}), {})(MessagesListComponent)
