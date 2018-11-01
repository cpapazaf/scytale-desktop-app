import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import { ChatRoomMembers } from '../containers/ChatRoomMembers'
import { Messages } from '../containers/Messages'
import { MessageForm } from '../containers/MessageForm'
import { ChatRoomConfigView } from '../containers/ChatRoomConfigView'
import { Status } from '../containers/Status'
import {CHAT_CONFIG_VIEW, CHAT_VIEW} from '../constants/Views'

export default class App extends React.Component {

  static propTypes = {
    currentView: PropTypes.string.isRequired
  }
  
  render() {
    const {currentView} = this.props

    switch(currentView) {
      case CHAT_CONFIG_VIEW:
        return (<ChatRoomConfigView />)
      case CHAT_VIEW:
        return (
          <div id="wrapper">
            <div id="leftPanel">
              <Status />
              <ChatRoomMembers />
            </div>
            <div id="rightPanel">
              <Messages />
              <MessageForm />
            </div>
          </div>
        )
      default:
        throw new Error('Not available view')
    }
  }
}