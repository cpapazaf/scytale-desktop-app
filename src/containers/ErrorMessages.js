import { connect } from 'react-redux'
import ErrorMessageLineComponent from '../components/ErrorMessageLine'
import { getServerException, getServerError } from '../selectors/AppSelectors'

export const ErrorMessages = connect(state => ({
  message: getServerError(state) || getServerException(state)
}), {})(ErrorMessageLineComponent)
