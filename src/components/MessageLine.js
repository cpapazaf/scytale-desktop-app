import React from 'react'
import PropTypes from 'prop-types'

const divStyle = {
  display: 'inline-block',
  border: 'solid 0px #000',
  width: "calc(100% - 30px)",
  wordWrap: "break-word"
}

const MessageLine = ({ message, author, timestamp }) => {
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

MessageLine.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired
}

export default MessageLine
