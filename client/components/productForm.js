import React, {Component} from 'react'
import {postNewProduct, updateProductById} from '../store/product'
import {connect} from 'react-redux'

class ProductForm extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      priceCents: 0,
      quantity: 0,
      imageUrl: ''
    }
  }

  // componentDidUpdate() {
  //     const {
  //       title,
  //       description,
  //       priceCents,
  //       quantity,
  //       imageUrl
  //     } = this.props.product
  //     this.setState({
  //       title,
  //       description,
  //       priceCents,
  //       quantity,
  //       imageUrl
  //     })
  // }

  handleSubmit = event => {
    event.preventDefault()
    if (this.props.product.id) {
      this.props.updateProduct(this.state, this.props.product.id)
      alert('Product Edit Purrfectly!')
      //reroute to AllProducts
    } else {
      this.props.postProduct(this.state)
      alert('Product Submitted Purrfectly!')
    }
  }

  handleChange = () => {
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
                type="url"
                name="imageUrl"
              />
            </div>

            <div>
              <label>Price:</label> <br />
              <input
                value={(this.state.priceCents / 100).toFixed(2)}
                onChange={this.handleChange}
                type="number"
                name="price"
                required
              />
            </div>
            <div>
              <label>Quantity:</label> <br />
              <input
                value={this.state.quantity}
                onChange={this.handleChange}
                type="number"
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
