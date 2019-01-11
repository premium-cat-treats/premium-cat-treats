import React from 'react'
import {Button, Image, List} from 'semantic-ui-react'

const CartItem = ({productItem, cartItem}) => (
  <List.Item>
    <List.Content floated="right">
      <Button>Delete</Button>
    </List.Content>
    <Image avatar src={productItem.imageUrl} />
    <List.Content>
      {productItem.title} x {cartItem.quantity}
    </List.Content>
  </List.Item>
)

export default CartItem
