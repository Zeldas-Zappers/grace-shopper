import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import productsReducer from './products'
import productReducer from './product'
import cartReducer from './cart'
import usersReducer from './users'

const reducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  product: productReducer,
  cart: cartReducer,
  users: usersReducer,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
