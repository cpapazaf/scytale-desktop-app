import { connect } from 'react-redux'
import ChatRoomMembersComponent from '../components/ChatRoomMembers'
import { getChatRoomName } from '../selectors/AppSelectors'
import { getPeers } from '../selectors/PeerSelectors'

export const ChatRoomMembers = connect(state => ({
  chatRoomName: getChatRoomName(state),
  peers: getPeers(state)
}), {})(ChatRoomMembersComponent)
