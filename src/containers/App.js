import { connect } from 'react-redux'
import AppComponent from '../components/App'
import { getView } from '../selectors/AppSelectors'

const mapStateToProps = (state) => {
  return {
    currentView: getView(state)
  }
}

export default connect(mapStateToProps, () => ({}))(AppComponent)
