import React from 'react'
import PropTypes from 'prop-types'

const messageInputStyle = {
  borderRadius: "5px",
  border: "solid 3px GRAY_LIGHT",
  boxShadow: "0 0 0 2px WHITE",
  boxSizing: "padding-box",
  fontSize: "15px",
  overflow: "auto",
  position: "absolute",
  width: "calc(100% - 26px)",
  resize: "none",
  height: "40px",
  right: "10px",
  left: "10px",
  bottom: "10px"
}

class MessageInput extends React.Component {
  constructor(props) {
    super(props)
    this.input = null
  }

  render() {
    return (
      <textarea
        tabIndex='0'
        raws='1'
        aria-label="Enter a message and press enter"
        style={messageInputStyle}
        onKeyPress={(e) => {
          // check if pressed enter and the text is not empty by removing trailing new lines
          if (e.key === 'Enter' && this.input && this.input.value.trim().replace(/^\s+|\s+$/g, '') !== '') {
            this.props.updateMessage(this.input.value, 'Me')
            this.input.value = ''
          }
        }}
        ref={(node) => {
          this.input = node
        }}
        autoFocus
      ></textarea>
    )
  }
}

MessageInput.propTypes = {
  updateMessage: PropTypes.func.isRequired
}

export default MessageInput
