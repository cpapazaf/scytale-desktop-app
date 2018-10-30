import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {CHAT_VIEW} from '../constants/Views'

export default class ChatRoomConfig extends Component {

  static propTypes = {
    updateUsername: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.usernameInput = null
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.updateUsername(this.usernameInput.value)
    this.props.setView(CHAT_VIEW)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              label="Username:"
              placeholder="For example, test1"
              ref={(node) => {
                this.usernameInput = node
              }}
            />
          </div>
          <div>
            <button type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}