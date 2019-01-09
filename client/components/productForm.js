import React, {Component} from 'react'
import {postNewProduct, updateProductById} from '../store/product'
import {connect} from 'react-redux'

class ProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.product.title,
      description: this.props.product.description,
      priceCents: (
        parseInt(this.props.product.priceCents, 10) / 100
      ).toString(),
      quantity: this.props.product.quantity.toString(),
      imageUrl: this.props.product.imageUrl
    }
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
      alert('Product Edit Successful!')
    } else {
      alert('Quantity and price must be valid numbers')
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <label>Product Title:</label> <br />
              <input
                value={this.state.title}
                onChange={this.handleChange}
                type="text"
                name="title"
                required
              />
            </div>

            <div>
              <label>Image:</label> <br />
              <input
                onChange={this.handleChange}
                value={this.state.imageUrl}
                type="text"
                name="imageUrl"
                placeholder="Image url here..."
              />
            </div>

            <div>
              <label>Price:</label> <br />
              <input
                value={this.state.priceCents}
                onChange={this.handleChange}
                type="text"
                name="priceCents"
                required
              />
            </div>
            <div>
              <label>Quantity:</label> <br />
              <input
                value={this.state.quantity}
                onChange={this.handleChange}
                type="text"
                name="quantity"
                required
              />
            </div>

            <div>
              <label>Description:</label> <br />
              <textarea
                value={this.state.description}
                onChange={this.handleChange}
                type="text"
                name="description"
              />
            </div>

            <br />
            <button type="submit">Submit Product Info</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  postProduct: productInfo => dispatch(postNewProduct(productInfo)),
  updateProduct: (productInfo, id) =>
    dispatch(updateProductById(productInfo, id))
})

export default connect(null, mapDispatchToProps)(ProductForm)
