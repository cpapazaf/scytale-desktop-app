import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MessageInputComponent from '../components/MessageInput'

import * as SimplePeerActions from '../actions/SimplePeer'

const mapDispatchToProps = dispatch => ({
  sendMessage: bindActionCreators(SimplePeerActions.sendMessage, dispatch)
})

export const MessageForm = connect(()=>({}), mapDispatchToProps)(MessageInputComponent)
