import React from 'react'
import PropTypes from 'prop-types'

const userListStyle = {
  backgroundColor: 'DarkKhaki',
}

const UserList = ({ users }) => (
  <div style={userListStyle}>
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  </div>
)

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default UserList
