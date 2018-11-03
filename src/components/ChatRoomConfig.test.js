import ChatRoomConfig from './ChatRoomConfig'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

describe('components/ChatRoomConfig', () => {

  let component, node, setView, setConfig, initConnection
  function render () {
    setConfig = jest.fn()
    setView = jest.fn()
    initConnection = jest.fn()
    component = TestUtils.renderIntoDocument(
      <ChatRoomConfig
       setConfig={setConfig}
       setView={setView}
       initConnection={initConnection}
      />
    )
    node = ReactDOM.findDOMNode(component)
  }
  
  let username = 'testUser'
  let chatroom = 'chatroomName'
  let remoteServer = 'aUrl'

  beforeEach(() => render())

  describe('Join Form', () => {

    let usernameInput, chatroomInput, serverurlInput
    beforeEach(() => {
      setConfig.mockClear()
      setView.mockClear()
      initConnection.mockClear()
    })

    describe('handleSubmit', () => {
      it('initializes a connection', () => {
        usernameInput = node.querySelector('input[name="uname"]')
        TestUtils.Simulate.change(usernameInput, {
          target: { value: username }
        })
        expect(usernameInput.value).toBe(username)

        chatroomInput = node.querySelector('input[name="chatroom"]')
        TestUtils.Simulate.change(chatroomInput, {
          target: { value: chatroom }
        })
        expect(chatroomInput.value).toBe(chatroom)

        serverurlInput = node.querySelector('input[name="serverurl"]')
        TestUtils.Simulate.change(serverurlInput, {
          target: { value: remoteServer }
        })
        expect(serverurlInput.value).toBe(remoteServer)

        TestUtils.Simulate.submit(node.querySelector('form'))
        expect(setConfig.mock.calls).toEqual([[ username, chatroom, remoteServer ]])
        expect(initConnection.mock.calls.length).toBe(1)
      })

      it('respects the default serverUrl', () => {
        TestUtils.Simulate.submit(node.querySelector('form'))
        expect(setConfig.mock.calls).toEqual([[ '', '', 'https://scytale-server.herokuapp.com' ]])
      })
    })
  })
})