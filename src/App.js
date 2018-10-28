import React from 'react'
import './App.css'
import { Users } from './containers/Users'
import { Messages } from './containers/Messages'
import { MessageForm } from './containers/MessageForm'

const App = () => (
  <div id="wrapper">
    <div id="leftPanel">
      <Users />
    </div>
    <div id="rightPanel">
      <Messages />
      <MessageForm />
    </div>
  </div>
)

export default App
