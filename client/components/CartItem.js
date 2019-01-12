import React from 'react'
import {Button, Image, List} from 'semantic-ui-react'

const CartItem = ({cartItem}) => {
  const {product} = cartItem
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
      <Image size="tiny" src={cartItem.product.imageUrl} />
      <List.Content>
        {cartItem.product.title} || Price: ${cartItem.product.priceCents / 100}{' '}
        || Quantity:
        <select defaultValue={cartItem.quantity}>{options}</select>
      </List.Content>
    </List.Item>
  )
}

export default CartItem
