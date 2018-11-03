import React from 'react'
import PropTypes from 'prop-types'
import { STATUS_ONLINE } from '../constants/ServerActions'

const StatusLineStyle = {
  backgroundColor: 'White',
  height: "40px",
  borderBottom: '2px solid #D1E3FF'
}

const IsOnlineStyle = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  margin: '15px',
  float: 'left'
}

const TextStyle = {
  color: "#414141",
  overflow: 'hidden',
  paddingTop: '10px'
}

export default class StatusLine extends React.Component {

  static propTypes = {
    status: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }

  render() {
    const {status, username} = this.props
    return (
      <div style={StatusLineStyle}>
        <div
          style={{
            ...IsOnlineStyle,
            background: status === STATUS_ONLINE ? '#6BD761' : 'gray'
          }}
        />
        <div style={TextStyle}>{username}</div>
      </div>
    )
  }
}
