import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import Product from './Product'

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {products} = this.props

    return (
      <div>
        {products.length ? (
          <div>
            <h2>All Products</h2>
            {products.map(product => {
              return <Product key={product.id} product={product} />
            })}
          </div>
        ) : (
          <div>No products in database.</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.productsReducer
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
