import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MessageInputComponent from '../components/MessageInput'

import * as SimplePeerActions from '../actions/SimplePeer'

const mapStateToProps = (state) => {
  return {
    username: state.app.username
  }
}

const mapDispatchToProps = dispatch => ({
  sendMessage: bindActionCreators(SimplePeerActions.sendMessage, dispatch)
})

export const MessageForm = connect(mapStateToProps, mapDispatchToProps)(MessageInputComponent)
