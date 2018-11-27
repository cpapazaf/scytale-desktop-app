import React from 'react'
import PropTypes from 'prop-types'

const messageInputStyle = {
  borderRadius: "5px",
  border: "solid 3px #D1E3FF",
  boxShadow: "0 0 0 2px WHITE",
  boxSizing: "padding-box",
  fontSize: "15px",
  overflow: "auto",
  position: "absolute",
  width: "calc(100% - 46px)",
  resize: "none",
  height: "40px",
  right: "20px",
  left: "20px",
  bottom: "15px"
}

export default class MessageInput extends React.Component {

  static propTypes = {
    sendMessage: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.input = null
    this.state = {
      message: ''
    }
  }

  handleChange = e => {
    this.setState({
      message: e.target.value
    })
  }

  handleKeyPress = e => {
    const { sendMessage } = this.props
    if (e.key === 'Enter') {
      e.preventDefault()
      if (e.key === 'Enter' && !e.shiftKey && this.input) {
        sendMessage(this.input.value)
        this.setState({ message: '' })
      }
    }
  }

  render() {
    const { message } = this.state
    return (
      <div>
        <textarea
          id='messageinput'
          placeholder='Enter a message and press enter'
          style={messageInputStyle}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          ref={(node) => {
            this.input = node
          }}
          autoFocus
          value={message}
        />
      </div>
    )
  }
}