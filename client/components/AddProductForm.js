import React, {Component} from 'react'
import {Segment, Form, Button} from 'semantic-ui-react'
import {postNewProduct, updateProductById} from '../store/product'
import {connect} from 'react-redux'

class AddProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: {
        title: '',
        description: '',
        priceCents: '',
        quantity: '',
        imageUrl: ''
      }
    }
  }

  onFormSubmit = event => {
    event.preventDefault()
    this.setState({
      isOpen: false
    })
  }
  handleFormOpen = () => {
    this.setState({
      isOpen: true
    })
  }

  handleCancel = () => {
    this.setState({
      isOpen: false
    })
  }
  onInputChange = event => {
    const newEvent = this.state.event
    newEvent[event.target.name] = event.target.value
    this.setState({
      event: {
        event: newEvent
      }
    })
  }
  render() {
    const {handleCancel} = this.props
    const {event} = this.state
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
                value={event.title}
                type="text"
                placeholder="Title"
              />
            </Form.Field>
            <Form.Field>
              <label>Image</label>
              <input
                name="imageURL"
                onChange={this.onInputChange}
                value={event.title}
                placeholder="Image URL"
              />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <input
                name="priceCents"
                onChange={this.onInputChange}
                value={event.title}
                placeholder="Enter the Price"
              />
            </Form.Field>
            <Form.Field>
              <label>Quantity</label>
              <input
                name="quantity"
                onChange={this.onInputChange}
                value={event.title}
                placeholder="Quantity"
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input
                name="description"
                onChange={this.onInputChange}
                value={event.title}
                placeholder="Description of product"
              />
            </Form.Field>
            <Button positive type="submit">
              Submit
            </Button>
            <Button onClick={handleCancel} type="button">
              Cancel
            </Button>
          </Form>
        </Segment>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  postProduct: productInfo => dispatch(postNewProduct(productInfo)),
  updateProduct: (productInfo, id) =>
    dispatch(updateProductById(productInfo, id))
})

export default connect(null, mapDispatchToProps)(AddProductForm)
