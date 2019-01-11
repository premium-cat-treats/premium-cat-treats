import React from 'react'
import {Button, Image, List} from 'semantic-ui-react'

const CartItem = ({cartItem}) => (
  <List.Item>
    <List.Content floated="right">
      <Button>Delete</Button>
    </List.Content>
    <Image avatar src={cartItem.product.imageUrl} />
    <List.Content>
      {cartItem.product.title} x {cartItem.quantity}
    </List.Content>
  </List.Item>
)

export default CartItem
