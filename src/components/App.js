import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import { ChatRoomConfigView } from '../containers/ChatRoomConfigView'
import { ChatRoomView } from '../containers/ChatRoom'
import { CHAT_CONFIG_VIEW, CHAT_VIEW } from '../constants/ViewsConstants'

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
          <ChatRoomView />
        )
      default:
        throw new Error('Not available view')
    }
  }
}