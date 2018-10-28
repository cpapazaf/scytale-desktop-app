import React from 'react'
import PropTypes from 'prop-types'

const divStyle = {
  display: 'inline-block',
  border: 'solid 0px #000',
  width: "calc(100% - 30px)",
  wordWrap: "break-word"
}

class MessageLine extends React.Component {
  render() {
    const messageTimestamp = new Date(this.props.timestamp)
    const messageTime = messageTimestamp.getHours() + ':' + messageTimestamp.getMinutes()
    return (
        <div>
        <b>{this.props.author}</b> - {messageTime}
        <br/>
        <div style={divStyle}>{this.props.message}</div>
        </div>
    )
  }
}

MessageLine.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired
}

export default MessageLine
