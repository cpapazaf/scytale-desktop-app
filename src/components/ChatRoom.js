import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ChatRoomMembers } from '../containers/ChatRoomMembers'
import { Messages } from '../containers/Messages'
import { ErrorMessages } from '../containers/ErrorMessages'
import { MessageForm } from '../containers/MessageForm'
import { Status } from '../containers/Status'
import { CHAT_CONFIG_VIEW } from '../constants/ViewsConstants'

const wrapperStyle = {
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  border: "0px"
}

const leftPanelStyle = {
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  width: "180px",
  height: "100%",
  overflow: "hidden"
}

const rightPanelStyle = {
  background: "#FFFFFF",
  position: "absolute",
  top: "0px",
  bottom: "0px",
  left: "180px",
  right: "0px"
}


const leftArrowStyle = {
  width: '10px',
  height: '10px',
  float: 'left',
  margin: '15px 10px 15px 15px',
  border: "solid black",
  borderWidth: "0 3px 3px 0",
  display: "inline-block",
  transform: "rotate(135deg)",
  WebkitTransform: "rotate(135deg)"
}

export default class ChatRoom extends Component {
  static propTypes = {
    setView: PropTypes.func.isRequired
  }

  handleGoBack = e => {
    this.props.setView(CHAT_CONFIG_VIEW)
  }

  render() {
    return (
      <div style={wrapperStyle}>
        <div style={leftPanelStyle}>
          <i style={leftArrowStyle} onClick={this.handleGoBack}/>
          <Status />
          <ChatRoomMembers />
        </div>
        <div style={rightPanelStyle}>
          <ErrorMessages />
          <Messages />
          <MessageForm />
        </div>
      </div>
    )
  }
}