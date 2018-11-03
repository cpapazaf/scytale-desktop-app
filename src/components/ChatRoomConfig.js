import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {CHAT_VIEW} from '../constants/Views'

const containerStyle = {
  position: 'fixed',
  padding: '0',
  margin: '0',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const formStyle = {
  width: '400px',
  border: '3px solid #f1f1f1',
  padding: '16px',
  borderRadius: "5px"
}

const inputStyle = {
  width: '100%',
  padding: '12px 20px',
  margin: '8px 0',
  display: 'inline-block',
  border: '1px solid #ccc',
  boxSizing: 'border-box'
}

const buttonStyle = {
  backgroundColor: 'khaki',
  color: 'white',
  padding: '14px 20px',
  margin: '8px 0',
  border: 'none',
  cursor: 'pointer',
  width: '100%',
  fontSize: '15px'
}


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
    this.state = {
      username: '',
      chatroom: '',
      serverUrl: process.env.NODE_ENV === 'development'? 'http://localhost:4000': "https://scytale-server.herokuapp.com"
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.updateUsername(this.state.username)
    this.props.setChatRoomName(this.state.chatroom)
    this.props.setRemoteServerUrl(this.state.serverUrl || this.remoteServerInput.value)
    this.props.initConnection()
    this.props.setView(CHAT_VIEW)
  }

  render() {
    const { username, chatroom,  serverUrl} = this.state
    return (
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="uname"><b>Display Name</b></label>
            <input
              style={inputStyle}
              name="uname"
              label="Username"
              placeholder="Enter Display Name"
              autoFocus
              onChange={ e => {
                this.setState({
                  username: e.target.value
                })
              }}
              value={username}
            />
          </div>
          <label htmlFor="chatroom"><b>Chatroom Name</b></label>
          <div>
            <input
              style={inputStyle}
              name="chatroom"
              label="ChatRoom Name"
              placeholder="Enter Chatroom Name"
              onChange={ e => {
                this.setState({
                  chatroom: e.target.value
                })
              }}
              value={chatroom}
            />
          </div>
          <label htmlFor="serverurl"><b>Remote Server</b></label>
          <div>
            <input
              style={inputStyle}
              name="serverurl"
              label="Enter RemoteServer Url"
              ref={(node) => {
                this.remoteServerInput = node
              }}
              onChange={ e => {
                this.setState({
                  serverUrl: e.target.value
                })
              }}
              value={serverUrl}
            />
          </div>
          <div>
            <button 
              style={buttonStyle} 
              type="submit">
                Join
            </button>
          </div>
        </form>
      </div>
    )
  }
}