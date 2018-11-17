import { connect } from 'react-redux'
import StatusLineComponent from '../components/StatusLine'
import { getUsername, getStatus } from '../selectors/AppSelectors'

export const Status = connect(state => ({
  status: getStatus(state),
  username: getUsername(state)
}), {})(StatusLineComponent)
