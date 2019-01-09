import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import ProductsList from './ProductsList'

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
            <ProductsList products={products} />
          </div>
        ) : (
          <div>No products in database.</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
