import React from 'react'
import {Button} from 'semantic-ui-react'

const Order = props => {
  const {productId, orderItem, image, price, quantity, status} = props
  return (
    <div className="single-order">
      <div>
        <h3 style={{marginBottom: '5px'}}>{orderItem}</h3>
        <p className="single-order-paragraph" style={{marginBottom: '15px'}}>
          <strong>Product Id: </strong>
          {productId}
        </p>
        <img src={image} style={{marginBottom: '15px'}} />
        <p className="single-order-paragraph">
          <strong>Price: </strong>${price}
        </p>
        <p className="single-order-paragraph">
          <strong>Qty: </strong>
          {quantity}
        </p>
        <p className="single-order-paragraph">
          <strong>Status: </strong>
          {status}
        </p>
      </div>
      <div>
        <Button>Cancel Item</Button>
      </div>
    </div>
  )
}

export default Order
