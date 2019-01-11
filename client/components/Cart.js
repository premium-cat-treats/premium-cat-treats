import React, {Component} from 'react'
import {connect} from 'react-redux'

class Cart extends Component {
  render() {
    const {cart, products} = this.props
    // const {title} = this.props.products[0].title
    // console.log(this.props.products[0].title)
    return (
      <div>
        <h1>Cart</h1>
        {this.props.cart.length ? (
          <div>
            {cart.map(cartItem => {
              const [productItem] = products.filter(
                product => product.id === cartItem.productId
              )
              return (
                <p key={productItem.id}>
                  {productItem.title} x {cartItem.quantity}
                </p>
              )
            })}
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
  products: state.products
})

// const mapDispatchToProps = dispatch => ({
//   fetchProducts: () => dispatch(fetchProducts())
// })

export default connect(mapStateToProps)(Cart)
