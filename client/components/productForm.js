import React from 'react'
import {Button} from 'semantic-ui-react'

const ProductForm = props => {
  return (
    <div className="form">
      <form onSubmit={props.handleSubmit}>
        <div>
          <h3 style={{marginBottom: '10px'}}>Enter Updated Product Info</h3>
          <div className="form-item">
            <label className="form-header">Product Title:</label> <br />
            <input
              value={props.formData.title}
              onChange={props.handleChange}
              type="text"
              name="title"
              required
            />
          </div>

          <div className="form-item">
            <label className="form-header">Image:</label> <br />
            <input
              value={props.formData.imageUrl}
              onChange={props.handleChange}
              type="url"
              name="imageUrl"
              placeholder="Image url here..."
            />
          </div>

          <div className="form-item">
            <label className="form-header">Price:</label> <br />
            <input
              value={props.formData.priceCents}
              onChange={props.handleChange}
              type="text"
              name="priceCents"
              required
            />
          </div>

          <div className="form-item">
            <label className="form-header">Quantity:</label> <br />
            <input
              value={props.formData.quantity}
              onChange={props.handleChange}
              type="text"
              name="quantity"
              required
            />
          </div>

          <div className="form-item">
            <label className="form-header">Description:</label> <br />
            <textarea
              value={props.formData.description}
              onChange={props.handleChange}
              type="text"
              name="description"
              rows="5"
              cols="75"
            />
          </div>

          <br />
          <Button type="submit" style={{color: '#5C9210'}}>
            Submit Product Info
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
