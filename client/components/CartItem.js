import React, {Component} from 'react'
import {Button, Image, List} from 'semantic-ui-react'

class CartItem extends Component {
  render() {
    const {cartItem, updateItemQuantity, deleteItem} = this.props
    const {product, quantity} = cartItem
    // Creates a dynamic array of options based on current product quantity.
    const quantityOptions = new Array(product.quantity)
    quantityOptions.fill('_')
    const options = quantityOptions.map((option, i) => (
      <option key={i} value={`${i + 1}`}>
        {i + 1}
      </option>
    ))

    return (
      <List.Item>
        <List.Content floated="right">
          <Button onClick={() => deleteItem(product.id)}>Delete</Button>
        </List.Content>
        <Image size="tiny" src={product.imageUrl} />
        <List.Content>
          <div className="product-title">{product.title}</div>
          || Price: ${(product.priceCents / 100).toFixed(2)} || Quantity:
          <select
            defaultValue={quantity}
            onChange={event =>
              updateItemQuantity(product, Number(event.target.value))
            }
          >
            {options}
          </select>
        </List.Content>
      </List.Item>
    )
  }
}

export default CartItem
