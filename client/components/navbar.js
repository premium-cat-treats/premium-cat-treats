import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import DropDownMenu from './DropDownMenu'
import {Icon} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div className="navbar">
    <Link to="/">
      <h2>
        <Icon name="paw" />PREMIUM CAT TREATS
      </h2>
    </Link>
    <DropDownMenu />
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/cart">
            <Icon name="cart" size="large" />
            Cart
          </Link>
          <Link to="/admin/products">
            <Icon name="clipboard" size="large" />Admin
          </Link>
          <Link to="/home">
            <Icon name="home" size="large" />Home
          </Link>
          <Link to={`/orders/${user.id}`}>
            <Icon name="shopping bag" size="large" />Orders
          </Link>
          <a href="#" onClick={handleClick}>
            <Icon name="log out" size="large" />Log Out
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/cart">
            <Icon name="cart" size="large" />Cart
          </Link>
          <Link to="/login">
            <Icon name="sign-in" size="large" />Log In
          </Link>
          <Link to="/signup">
            <Icon name="pencil alternate" size="large" />Sign Up
          </Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
