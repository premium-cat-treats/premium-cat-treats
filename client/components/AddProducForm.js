import React, {Component} from 'react'
import {Segment, Form, Button} from 'semantic-ui-react'
import {postNewProduct, updateProductById} from '../store/product'
import {connect} from 'react-redux'

class AddProductForm extends Component {
  render() {
    return (
      <div>
        <Segment>
          <Form>
            <h3>Add New Product</h3>

            <Form.Field>
              <label>Product Title:</label>
              <input type="text" placeholder="Title" />
            </Form.Field>
            <Form.Field>
              <label>Image</label>
              <input placeholder="Img URL" />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <input placeholder="Enter the Price" />
            </Form.Field>
            <Form.Field>
              <label>Quantity</label>
              <input placeholder="Quantity" />
            </Form.Field>
            <Button positive type="submit">
              Submit
            </Button>
            <Button type="button">Cancel</Button>
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
