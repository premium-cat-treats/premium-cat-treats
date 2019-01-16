import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, me} from '../store'
import DropDownMenu from './DropDownMenu'
import {Icon} from 'semantic-ui-react'

class Navbar extends React.Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isAdmin, isLoggedIn, user, handleClick} = this.props
    return (
      <div className="navbar">
        <Link to="/">
          <h2>
            <Icon name="paw" />PREMIUM CAT TREATS
          </h2>
        </Link>
        <DropDownMenu />
        <nav>
          {isLoggedIn && isAdmin ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/">
                <Icon name="home" size="large" />Home
              </Link>
              <Link to="/admin">
                <Icon name="clipboard" size="large" />Admin
              </Link>
              <Link to="/cart">
                <Icon name="cart" size="large" />Cart
              </Link>
              <Link to={`/orders/${user.id}`}>
                <Icon name="shopping bag" size="large" />Orders
              </Link>
              <a href="#" onClick={handleClick}>
                <Icon name="log out" size="large" />Log Out
              </a>
            </div>
          ) : isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/">
                <Icon name="home" size="large" />Home
              </Link>
              <Link to="/cart">
                <Icon name="cart" size="large" />Cart
              </Link>
              <Link to={`/orders/${user.id}`}>
                <Icon name="shopping bag" size="large" />Orders
              </Link>
              <a href="#" onClick={handleClick}>
                <Icon name="log out" size="large" />
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/">
                <Icon name="home" size="large" />Home
              </Link>
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
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    isAdmin: state.user.adminAccess || false
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}
