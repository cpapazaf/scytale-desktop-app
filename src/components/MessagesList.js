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


class MessagesList extends React.Component {
  constructor(props) {
    super(props)
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  scrollToBottom = () => {
    var that = this
    setTimeout(() => {
      window.requestAnimationFrame(() => {
        const scrollHeight = that.messageList.scrollHeight
        const height = that.messageList.clientHeight
        const maxScrollTop = scrollHeight - height
        that.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
      })
    }, 0)
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  render() {
    this.scrollToBottom()
    return (
      <div>
        <div style={messagesListStyle}
        ref={(div) => {
          this.messageList = div;
        }}
        >
          <ul>
            {
              this.props.messages.map(message => (
                <MessageLine
                  key={message.id}
                  {...message}
                />
              ))
            }
          </ul>
        </div>
        <div style={{ float:"left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el }}>
        </div>
      </div>
    )
  }
}

MessagesList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default MessagesList
