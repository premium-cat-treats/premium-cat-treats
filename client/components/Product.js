import React, {Component} from 'react'

export default class Product extends Component {
  render() {
    const {product} = this.props

    return (
      <div>
        <h3>{product.title}</h3>
        <p>Price: ${product.priceCents / 100}</p>
        <p>Description: {product.description}</p>
      </div>
    )
  }
}
