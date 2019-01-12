import React from 'react'

const Order = props => {
  const {orderItem, image, price, quantity} = props
  return (
    <div>
      <h4>{orderItem}</h4>
      <img src={image} />
      <p>
        <strong>Price:</strong>
        {price}
      </p>
      <p>
        <strong>Qty:</strong>
        {quantity}
      </p>
    </div>
  )
}

export default Order
