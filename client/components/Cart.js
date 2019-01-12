import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {List, Button} from 'semantic-ui-react'

class Cart extends Component {
  constructor() {
    super()

    this.state = {
      totalPriceCents: 0
    }
  }

  componentDidMount() {
    const {cart: cartItems} = this.props
    const totalPriceCents = cartItems.reduce(
      (total, item) => total + item.product.priceCents * item.quantity,
      0
    )

    this.setState({totalPriceCents})
  }

  // TODO: pass down function to each cartItem to update totalPriceCents on change.

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
            <h3>Total: ${this.state.totalPriceCents / 100}</h3>
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
