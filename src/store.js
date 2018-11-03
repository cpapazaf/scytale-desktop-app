import { applyMiddleware, createStore as _createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

// process.env.NODE_ENV === 'development'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const createStore = () => _createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
)

export default createStore()