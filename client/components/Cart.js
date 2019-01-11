import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {List, Button} from 'semantic-ui-react'

class Cart extends Component {
  render() {
    const {cart} = this.props

    return (
      <div>
        <h1>Cart</h1>
        {this.props.cart.length ? (
          <div>
            <List divided verticalAlign="middle">
              {cart.map(cartItem => {
                return (
                  <CartItem key={cartItem.product.id} cartItem={cartItem} />
                )
              })}
            </List>
            <Button>Submit Order</Button>
          </div>
        ) : (
          <h2>Your Shopping Cart is empty.</h2>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user
})

export default connect(mapStateToProps)(Cart)
