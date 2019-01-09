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

  componentDidMount() {
    if (this.props.product) {
      const {
        title,
        description,
        priceCents,
        quantity,
        imageUrl
      } = this.props.product
      this.setState({
        title,
        description,
        priceCents,
        quantity,
        imageUrl
      })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.props.product) {
      this.props.updateProduct(this.state, this.props.product.id)
      alert('Product Submitted Purrfectly!')
      //reroute to AllProducts
    } else {
      this.props.postProduct(this.state)
      //reroute to AllProducts
    }
  }

  handleChange = () => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
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
                placeholder="Title"
                required
              />
            </div>

            <div>
              <label>Description:</label> <br />
              <input
                value={this.state.priceCents}
                onChange={this.handleChange}
                type="number"
                name="price"
                placeholder="Product Price"
                required
              />
            </div>
            <div>
              <label>Quantity:</label> <br />
              <input
                value={this.state.priceCents}
                onChange={this.handleChange}
                type="number"
                name="quantity"
                placeholder="Quantity"
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
                placeholder="Decribe the product"
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
