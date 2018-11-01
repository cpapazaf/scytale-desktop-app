import { connect } from 'react-redux'
import AppComponent from '../components/App'
import { setView } from '../actions/App'

const mapStateToProps = (state) => {
  return {
    currentView: state.app.currentView
  }
}

const mapDispatchToProps = dispatch => ({
  setView: (view) => {
    dispatch(setView(view))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent)
