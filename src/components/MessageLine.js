import React from 'react'
import PropTypes from 'prop-types'

const divStyle = {
  display: 'inline-block',
  border: 'solid 0px #000',
  width: "calc(100% - 30px)",
  wordWrap: "break-word"
}

export default class MessageLine extends React.Component {

  static propTypes = {
    message: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired
  }

  render() {
    const {timestamp, author, message} = this.props

    const messageTimestamp = new Date(timestamp)
    const messageTime = messageTimestamp.getHours() + ':' + messageTimestamp.getMinutes()
    return (
        <div>
          <b>{author}</b> - {messageTime}
          <br/>
          <div style={divStyle}>{message}</div>
        </div>
    )
  }
}