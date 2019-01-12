import React from 'react'
import {Button, Image, List} from 'semantic-ui-react'

const CartItem = ({cartItem, updateItemQuantity}) => {
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
        <Button>Delete</Button>
      </List.Content>
      <Image size="tiny" src={product.imageUrl} />
      <List.Content>
        {product.title}
        || Price: ${product.priceCents / 100} || Quantity:
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

export default CartItem
