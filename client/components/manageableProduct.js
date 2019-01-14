import React, {Component} from 'react'
import ProductForm from './productForm'
import {connect} from 'react-redux'
import {updateProductById, fetchSingleProduct} from '../store/product'
import {Button, Container, Icon} from 'semantic-ui-react'
// import {UpdateProductMessage} from './updateProductMessage'

class ManageableProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      priceCents: '',
      quantity: '',
      imageUrl: '',
      messageIsShowing: false,
      message: ''
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
    this.props.updateProduct({deleted: true}, id)
    this.setState({
      message: 'This product has been deleted',
      messageIsShowing: true
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  toggleMessageOff = () => {
    this.setState({messageIsShowing: false})
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
      this.setState({
        message: 'This product has been deleted',
        messageIsShowing: true
      })
    }
    //TODO: Add user message for invalid input data
  }

  render() {
    const {
      id,
      title,
      imageUrl,
      priceCents,
      quantity,
      description
    } = this.props.product
    return (
      <div className="single-admin-product">
        <h2 style={{marginBottom: '15px'}}>Edit this Product</h2>
        {this.props.product && this.props.product.id ? (
          <Container>
            <div className="single-product">
              <h3>{title}</h3>
              <img src={imageUrl} style={{marginBottom: '15px'}} />
              <p style={{fontSize: '14px'}}>
                <strong>Product Id: </strong>
                {id}
              </p>
              <p style={{fontSize: '14px'}}>
                <strong>Price: </strong>${(priceCents / 100).toFixed(2)}
              </p>
              <p style={{display: 'inline-block', fontSize: '14px'}}>
                <strong>Qty: </strong>
                {quantity}
              </p>
              <p style={{marginBottom: '20px'}}>
                <strong>Product Description: </strong>
                {description}
              </p>

              <Button
                onClick={() => this.deleteProduct(id)}
                style={{color: '#944317'}}
              >
                Delete this Product
              </Button>
            </div>
            <ProductForm
              formData={this.state}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </Container>
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
  updateProduct: (productInfo, id) =>
    dispatch(updateProductById(productInfo, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageableProduct)
