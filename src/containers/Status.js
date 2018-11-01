import { connect } from 'react-redux'
import StatusLineComponent from '../components/StatusLine'

export const Status = connect(state => ({
  status: state.app.status,
  username: state.app.username
}), {})(StatusLineComponent)
