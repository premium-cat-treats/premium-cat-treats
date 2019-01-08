import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'

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
            <h2>Products Available</h2>
            {products.map(product => {
              return (
                <div key={product.id}>
                  <h3>{product.title}</h3>{' '}
                  <p>Price: ${product.priceCents / 100}</p>
                  <p>Description: {product.description}</p>
                </div>
              )
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
