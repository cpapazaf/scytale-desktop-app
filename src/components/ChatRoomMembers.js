import React from 'react'
import PropTypes from 'prop-types'

const wrapperStyle = {
  height: '100%',
  backgroundColor: 'Khaki'
}

const ChatRoomNameStyle = {
  paddingTop: "20px",
  textAlign: 'center',
  verticalAlign: 'middle',
  color: "#414141"
}

const horizontalLineStyle = {
  display: 'block',
  width: '92%',
  border: '0',
  borderTop: '1px solid #ccc',
  margin: '5',
  padding: '0',
}

const ChatRoomMembersStyle = {
  top: "20px",
}

export default class ChatRoomMembers extends React.Component {

  static propTypes = {
    chatRoomName: PropTypes.string.isRequired,
    users: PropTypes.object.isRequired
  }

  render() {
    const {users, chatRoomName} = this.props
    return (
      <div style={wrapperStyle}>
        <div style={ChatRoomNameStyle}>
        #{chatRoomName}
        </div>
        <hr style={horizontalLineStyle} />
        <div style={ChatRoomMembersStyle}>
          <ul>
            {Object.keys(users).map(userId => (
              <li key={userId}>{users[userId].name}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
