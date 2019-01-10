import React, {Component} from 'react'
import ProductForm from './productForm'
import {connect} from 'react-redux'
import {
  updateProductById,
  fetchSingleProduct,
  deleteProductById
} from '../store/product'

class ManageableProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      priceCents: '',
      quantity: '',
      imageUrl: ''
    }
  }

  async componentDidMount() {
    await this.props.fetchSingleProduct(this.props.match.params.productId)
    this.setState({
      title: this.props.product.title,
      description: this.props.product.description,
      priceCents: (this.props.product.priceCents / 100).toFixed(2).toString(),
      quantity: this.props.product.quantity.toString(),
      imageUrl: this.props.product.imageUrl
    })
  }

  deleteProduct = id => {
    this.props.deleteProduct(id)
    this.props.history.push('/products')
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    let price = this.state.priceCents
    if (!price.includes('.')) {
      price = price + '00'
    }
    let newPrice = ''
    for (let i = 0; i < price.length; i++) {
      if (price[i] !== '.' && price[i] !== ',') {
        newPrice += price[i]
      }
    }
    newPrice = parseInt(newPrice, 10)
    console.log(newPrice)
    let newQuantity = parseInt(this.state.quantity, 10)
    console.log(newQuantity)
    if (!isNaN(newPrice) && !isNaN(newQuantity)) {
      const updateObject = {
        title: this.state.title,
        description: this.state.description,
        quantity: newQuantity,
        priceCents: newPrice,
        imageUrl: this.state.imageUrl
      }
      this.props.updateProduct(updateObject, this.props.product.id)
      this.props.history.push('/products')
      //TODO: Add user message for successful update
    }
    //TODO: Add user message for invalid input data
  }

  render() {
    return (
      <div className="single-admin-product">
        {this.props.product && this.props.product.id ? (
          <div>
            <div>
              <h3>{this.props.product.title}</h3>
              <img src={this.props.product.imageUrl} />
              <h4>${(this.props.product.priceCents / 100).toFixed(2)}</h4>
              <h4>{this.props.product.quantity}</h4>
              <p>{this.props.product.description}</p>
            </div>
            <button onClick={() => this.deleteProduct(this.props.product.id)}>
              Delete this Product
            </button>
            <ProductForm
              formData={this.state}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
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
  deleteProduct: id => dispatch(deleteProductById(id)),
  updateProduct: (productInfo, id) =>
    dispatch(updateProductById(productInfo, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageableProduct)
