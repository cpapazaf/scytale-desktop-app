import { connect } from 'react-redux'
import AppComponent from '../components/App'

const mapStateToProps = (state) => {
  return {
    currentView: state.app.currentView
  }
}

export default connect(mapStateToProps, () => ({}))(AppComponent)
