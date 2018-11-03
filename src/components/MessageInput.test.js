import MessageInput from './MessageInput'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

describe('components/MessageInput', () => {

  let component, node, sendMessage
  function render () {
    sendMessage = jest.fn()
    component = TestUtils.renderIntoDocument(
      <MessageInput
        sendMessage={sendMessage}
      />
    )
    node = ReactDOM.findDOMNode(component)
  }
  let message = 'test message'

  beforeEach(() => render())

  describe('send message', () => {

    let textarea
    beforeEach(() => {
      sendMessage.mockClear()
      textarea = node.querySelector('textarea')
      TestUtils.Simulate.change(textarea, {
        target: { value: message }
      })
      expect(textarea.value).toBe(message)
    })

    describe('handleKeyPress', () => {
      it('sends a message', () => {
        TestUtils.Simulate.keyPress(textarea, {
          key: 'Enter'
        })
        expect(textarea.value).toBe('')
        expect(sendMessage.mock.calls).toEqual([[ message ]])
      })

      it('does nothing when another key is pressed', () => {
        TestUtils.Simulate.keyPress(textarea, {
          key: 'random'
        })
        expect(sendMessage.mock.calls.length).toBe(0)
      })
    })
  })
})