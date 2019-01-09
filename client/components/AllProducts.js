import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import {Link} from 'react-router-dom'

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
                  {/* {this.props.user.adminAccess ? <Link to= add route here>Edit this product</Link>} */}
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
  products: state.productsReducer,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
