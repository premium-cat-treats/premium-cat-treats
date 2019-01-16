import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import ManageableProduct from './components/ManageableProduct'
import AllProducts from './components/AllProducts'
import ProductsInCategory from './components/ProductsInCategory'
import AdminDashboard from './components/AdminDashboard'
import Orders from './components/Orders'
import Cart from './components/Cart'
import AdminOrders from './components/AdminOrders'
import AdminUsers from './components/AdminUsers'
import AdminProducts from './components/AdminProducts'
import ManageableUser from './components/ManageableUser'
import OrderConfirmation from './components/OrderConfirmation'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}

        <Route exact path="/" component={AllProducts} />
        <Route path="/category/:categoryId" component={ProductsInCategory} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/order-confirmation/:orderId"
          component={OrderConfirmation}
        />
        {isLoggedIn &&
          isAdmin && (
            <Switch>
              <Route
                exact
                path="/products/admin/:productId"
                component={ManageableProduct}
              />
              <Route exact path="/admin" component={AdminDashboard} />
              <Route exact path="/admin/products" component={AdminProducts} />
              <Route exact path="/admin/users" component={AdminUsers} />
              <Route
                exact
                path="/admin/users/:userId"
                component={ManageableUser}
              />
              <Route exact path="/orders/:userId" component={Orders} />
              <Route
                exact
                path="/admin/edit-order/:userId"
                component={Orders}
              />
              <Route path="/admin/orders" component={AdminOrders} />
            </Switch>
          )}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/orders/:userId" component={Orders} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={AllProducts} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.adminAccess || false
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
