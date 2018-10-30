import React from 'react'
import PropTypes from 'prop-types'

const userListStyle = {
  backgroundColor: 'DarkKhaki',
}

export default class UserList extends React.Component {

  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired).isRequired
  }

  render() {
    const {users} = this.props
    return (
      <div style={userListStyle}>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}
