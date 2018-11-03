import React, { Component } from 'react'
import { ChatRoomMembers } from '../containers/ChatRoomMembers'
import { Messages } from '../containers/Messages'
import { MessageForm } from '../containers/MessageForm'
import { Status } from '../containers/Status'


export default class ChatRoom extends Component {
  render() {
    return (
      <div id="wrapper">
        <div id="leftPanel">
          <Status />
          <ChatRoomMembers />
        </div>
        <div id="rightPanel">
          <Messages />
          <MessageForm />
        </div>
      </div>
    )
  }
}