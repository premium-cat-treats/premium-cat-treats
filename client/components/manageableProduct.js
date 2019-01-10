import React, {Component} from 'react'
import ProductForm from './productForm'
import {connect} from 'react-redux'
import {fetchSingleProduct, deleteProductById} from '../store/product'
import AddProductForm from './AddProducForm'

class ManageableProduct extends Component {
  constructor(props) {
    super(props)

    this.deleteProduct = this.deleteProduct.bind(this)
  }
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  deleteProduct(id) {
    this.props.deleteProduct(id)
    this.props.history.push('/products')
  }

  render() {
    const {
      title,
      imageUrl,
      priceCents,
      quantity,
      description,
      id
    } = this.props.product
    return (
      <div className="single-admin-product">
        {id ? (
          <div>
            <div>
              <h3>{title}</h3>
              <img src={imageUrl} />
              <h4>{priceCents / 100}</h4>
              <h4>{quantity}</h4>
              <p>{description}</p>
            </div>
            <button onClick={() => this.deleteProduct(id)}>
              Delete this Product
            </button>
            <ProductForm product={this.props.product} />
          </div>
        ) : null}
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
