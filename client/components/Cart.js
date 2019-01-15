import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {List, Button} from 'semantic-ui-react'
import {updateItemQuantity, deleteItem, totalPriceCents} from '../store/cart'

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
                  <CartItem
                    key={cartItem.product.id}
                    cartItem={cartItem}
                    updateItemQuantity={this.props.updateItemQuantity}
                    deleteItem={this.props.deleteItem}
                  />
                )
              })}
            </List>
            <h3>Total: ${(this.props.totalPriceCents / 100).toFixed(2)}</h3>
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
  user: state.user,
  totalPriceCents: totalPriceCents(state)
})

const mapDispatchToProps = dispatch => ({
  updateItemQuantity: (product, quantity) =>
    dispatch(updateItemQuantity(product, quantity)),
  deleteItem: productId => dispatch(deleteItem(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
