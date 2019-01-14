import React, {Component} from 'react'
import ProductForm from './ProductForm'
import {connect} from 'react-redux'
import {updateProductById, fetchSingleProduct} from '../store/product'
import {Button, Container, Icon} from 'semantic-ui-react'
import UpdateProductMessage from './UpdateProductMessage'

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
    if (this.props.product.deleted) {
      this.setState({
        messageIsShowing: true,
        message:
          'You cannot delete this product because it has already been deleted.'
      })
    } else {
      this.props.updateProduct({deleted: true}, id)
      this.setState({
        messageIsShowing: true,
        message: 'Product successfully deleted'
      })
    }
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
    if (this.props.product.deleted) {
      this.setState({
        messageIsShowing: true,
        message:
          'You cannot update this product because it is marked as deleted from the database.'
      })
    } else if (!this.props.product.deleted) {
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
      let newQuantity = parseInt(this.state.quantity, 10)
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
          messageIsShowing: true,
          message: 'Product successfully updated'
        })
      } else {
        this.setState({
          messageIsShowing: true,
          message:
            'Please review your input to make sure you have entered valid data types.'
        })
      }
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
      description,
      deleted
    } = this.props.product

    const deletedMessage = deleted ? (
      <p style={{color: '#944317', fontSize: '1.25rem'}}>
        This product is currently deleted from the database. You cannot update
        its information.
      </p>
    ) : null

    return (
      <div className="single-admin-product">
        <UpdateProductMessage
          show={this.state.messageIsShowing}
          userMessage={this.state.message}
          messageToggle={this.toggleMessageOff}
        />
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
              {deletedMessage}
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
