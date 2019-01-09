import React, {Component} from 'react'
import ProductForm from './productForm'
import {connect} from 'react-redux'
import {fetchSingleProduct, deleteProductById} from '../store/product'

class ManageableProduct extends Component {
  constructor(props) {
    super(props)

    this.deleteProduct = this.deleteProduct.bind(this)
  }
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  deleteProduct() {
    this.props.deleteProduct(id)
    this.props.history.push('/products')
  }

  render() {
    return (
      <div className="single-admin-product">
        {this.props.product.id ? (
          <div>
            <h3>{this.props.product.title}</h3>
            <img src={this.props.product.imageUrl} />
            <h4>{this.props.product.priceCents / 100}</h4>
            <h4>{this.props.product.quantity}</h4>
            <p>{this.props.product.description}</p>
          </div>
        ) : null}
        <button onClick={this.deleteProduct}>Delete this Product</button>
        <ProductForm product={this.props.product} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.currentProduct
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
  deleteProduct: id => dispatch(deleteProductById(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageableProduct)
