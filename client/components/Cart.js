import React, {Component} from 'react'
import {connect} from 'react-redux'

class Cart extends Component {
  render() {
    // const {cart, products} = this.props
    console.log(this.props)
    return (
      <div>
        {this.props.products.length ? (
          <div>
            <h1>Cart</h1>
          </div>
        ) : null}
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
