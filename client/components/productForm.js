import React from 'react'
import {Button, Form} from 'semantic-ui-react'

const ProductForm = props => {
  return (
    <div className="form">
      <h3 style={{marginBottom: '20px'}}>Enter Updated Product Info</h3>
      <Form onSubmit={props.handleSubmit}>
        <Form.Field className="form-item">
          <label className="form-header">Product Title:</label> <br />
          <input
            value={props.formData.title}
            onChange={props.handleChange}
            type="text"
            name="title"
            required
          />
        </Form.Field>

        <Form.Field className="form-item">
          <label className="form-header">Image:</label> <br />
          <input
            value={props.formData.imageUrl}
            onChange={props.handleChange}
            type="url"
            name="imageUrl"
            placeholder="Image url here..."
          />
        </Form.Field>

        <Form.Field className="form-item">
          <label className="form-header">Price:</label> <br />
          <input
            value={props.formData.priceCents}
            onChange={props.handleChange}
            type="text"
            name="priceCents"
            required
          />
        </Form.Field>

        <Form.Field className="form-item">
          <label className="form-header">Quantity:</label> <br />
          <input
            value={props.formData.quantity}
            onChange={props.handleChange}
            type="text"
            name="quantity"
            required
          />
        </Form.Field>

        <Form.Field className="form-item">
          <label className="form-header">Description:</label> <br />
          <textarea
            value={props.formData.description}
            onChange={props.handleChange}
            type="text"
            name="description"
            rows="5"
            cols="75"
          />
        </Form.Field>

        <br />
        <Button type="submit" style={{color: '#5C9210'}}>
          Submit Product Info
        </Button>
      </Form>
    </div>
  )
}

export default ProductForm
