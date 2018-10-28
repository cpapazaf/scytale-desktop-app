import React from 'react'
import PropTypes from 'prop-types'
import MessageLine from './MessageLine'


const messagesListStyle = {
  position: "absolute",
  top: "0",
  bottom: "60px",
  width: "100%",
  right: "0",
  left: "0",
  overflow: "auto"
}


const MessagesList = ({ messages }) => {
  let elem
  return (
    <div style={messagesListStyle}
      ref={(node) => { elem = node; }}
    >
      <ul>
        {messages.map(message => (
          <MessageLine
            key={message.id}
            {...message}
          />
        ))}
      </ul>
    </div>
  )
}

MessagesList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default MessagesList
