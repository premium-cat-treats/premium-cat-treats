import React, {Component} from 'react'
import {Segment, Form, Button} from 'semantic-ui-react'
import {postNewProduct} from '../store/product'
import {connect} from 'react-redux'

class AddProductForm extends Component {
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

  onFormSubmit = evt => {
    evt.preventDefault()
    if (!isNaN(this.state.priceCents) && !isNaN(this.state.quantity)) {
      const newProduct = {
        title: this.state.title,
        description: this.state.description,
        quantity: this.state.quantity,
        priceCents: this.state.priceCents,
        imageUrl: this.state.imageUrl
      }
      this.props.postNewProduct(newProduct)
      this.props.history.push('/products')
    }
  }

  onInputChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  render() {
    const {handleClose} = this.props
    const {title, description, priceCents, quantity, imageUrl} = this.state
    return (
      <div>
        <Segment>
          <Form onSubmit={this.onFormSubmit}>
            <h3>Add New Product</h3>

            <Form.Field>
              <label>Product Title:</label>
              <input
                name="title"
                onChange={this.onInputChange}
                value={title}
                type="text"
                placeholder="Title"
              />
            </Form.Field>
            <Form.Field>
              <label>Image</label>
              <input
                name="imageUrl"
                onChange={this.onInputChange}
                value={imageUrl}
                placeholder="Image URL"
              />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <input
                name="priceCents"
                onChange={this.onInputChange}
                value={priceCents}
                placeholder="Enter the Price"
              />
            </Form.Field>
            <Form.Field>
              <label>Quantity</label>
              <input
                name="quantity"
                onChange={this.onInputChange}
                value={quantity}
                placeholder="Quantity"
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input
                name="description"
                onChange={this.onInputChange}
                value={description}
                placeholder="Description of product"
              />
            </Form.Field>
            <Button positive type="submit">
              Submit
            </Button>
            <Button onClick={handleClose} type="button">
              Cancel
            </Button>
          </Form>
        </Segment>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  postNewProduct: productInfo => dispatch(postNewProduct(productInfo))
})

export default connect(null, mapDispatchToProps)(AddProductForm)
