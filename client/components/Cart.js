import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {List, Button} from 'semantic-ui-react'

class Cart extends Component {
  render() {
    const {cart, products} = this.props

    return (
      <div>
        <h1>Cart</h1>
        {this.props.cart.length ? (
          <div>
            <List divided verticalAlign="middle">
              {cart.map(cartItem => {
                const [productItem] = products.filter(
                  product => product.id === cartItem.productId
                )
                return (
                  <CartItem
                    key={productItem.id}
                    cartItem={cartItem}
                    productItem={productItem}
                  />
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
  products: state.products,
  user: state.user
})

// const mapDispatchToProps = dispatch => ({
//   fetchProducts: () => dispatch(fetchProducts())
// })

export default connect(mapStateToProps)(Cart)
