import React, {Component} from 'react'
import {connect} from 'react-redux'
import ManageableProduct from './manageableProduct'
import {fetchProducts, deleteProductById} from '../store/product'
//TODO: show conditionally in navbar
class AdminProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  deleteProduct = id => {
    this.props.deleteProduct(id)
  }

  render() {
    return this.props.products.map(product => {
      return (
        <ManageableProduct
          key={product.id}
          product={product}
          deleteProduct={() => this.deleteProduct(product.id)}
        />
      )
    })
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  deleteProduct: id => dispatch(deleteProductById(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts)
