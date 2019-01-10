import React from 'react'

const ProductForm = props => {
  return (
    <div className="form">
      <form onSubmit={props.handleSubmit}>
        <div>
          <div>
            <label>Product Title:</label> <br />
            <input
              value={props.formData.title}
              onChange={props.handleChange}
              type="text"
              name="title"
              required
            />
          </div>

          <div>
            <label>Image:</label> <br />
            <input
              value={props.formData.imageUrl}
              onChange={props.handleChange}
              type="url"
              name="imageUrl"
              placeholder="Image url here..."
            />
          </div>

          <div>
            <label>Price:</label> <br />
            <input
              value={props.formData.priceCents}
              onChange={props.handleChange}
              type="text"
              name="priceCents"
              required
            />
          </div>
          <div>
            <label>Quantity:</label> <br />
            <input
              value={props.formData.quantity}
              onChange={props.handleChange}
              type="text"
              name="quantity"
              required
            />
          </div>

          <div>
            <label>Description:</label> <br />
            <textarea
              value={props.formData.description}
              onChange={props.handleChange}
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

export default ProductForm
