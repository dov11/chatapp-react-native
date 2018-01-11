import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools';
import apiMiddleware from './middleware/api';
import reducers from './reducers'

const reducer = combineReducers(Object.assign({}, reducers))

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
  applyMiddleware(ReduxThunk),
  applyMiddleware(apiMiddleware),
)

const store = createStore(reducer, enhancer)

export default store
