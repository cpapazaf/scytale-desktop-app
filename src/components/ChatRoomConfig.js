import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {CHAT_VIEW} from '../constants/Views'

export default class ChatRoomConfig extends Component {

  static propTypes = {
    updateUsername: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired,
    setChatRoomName: PropTypes.func.isRequired,
    setRemoteServerUrl: PropTypes.func.isRequired,
    initConnection: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.usernameInput = null
    this.chatRoomNameInput = null
    this.remoteServerInput = null
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.updateUsername(this.usernameInput.value)
    this.props.setChatRoomName(this.chatRoomNameInput.value)
    this.props.setRemoteServerUrl(this.remoteServerInput.value)
    this.props.initConnection()
    this.props.setView(CHAT_VIEW)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              label="Username:"
              placeholder="For example, test1"
              ref={(node) => {
                this.usernameInput = node
              }}
            />
          </div>
          <div>
            <input
              label="ChatRoomName:"
              placeholder="For example, chatroom1"
              ref={(node) => {
                this.chatRoomNameInput = node
              }}
            />
          </div>
          <div>
            <input
              label="RemoteServer:"
              defaultValue="http://localhost:4000"
              ref={(node) => {
                this.remoteServerInput = node
              }}
            />
          </div>
          <div>
            <button type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}