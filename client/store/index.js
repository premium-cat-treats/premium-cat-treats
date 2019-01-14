import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {user, users} from './user'
import {products, currentProduct} from './product'
import {categoriesReducer} from './category'
import {cartReducer} from './cart'
import {userOrders} from './order'

const reducer = combineReducers({
  user,
  users,
  products,
  currentProduct,
  userOrders,
  categories: categoriesReducer,
  cart: cartReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
