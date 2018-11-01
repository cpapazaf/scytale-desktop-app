import { connect } from 'react-redux'
import ChatRoomMembersComponent from '../components/ChatRoomMembers'

export const ChatRoomMembers = connect(state => ({
  chatRoomName: state.app.chatRoomName,
  users: state.users
}), {})(ChatRoomMembersComponent)
