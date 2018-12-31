import React from 'react'
import PropTypes from 'prop-types'

const StatusLineStyle = {
  backgroundColor: 'White',
  height: "40px",
  paddingLeft: "10px",
  borderBottom: '2px solid #D1E3FF',
  lineHeight: "40px" // centers the text vertically
}

export default class ErrorMessageLine extends React.Component {

  static propTypes = {
    message: PropTypes.string
  }

  render() {
    const {message} = this.props
    return (
      <div style={StatusLineStyle}>
        {message}
      </div>
    )
  }
}
