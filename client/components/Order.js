import React from 'react'

const Order = props => {
  const {orderItem, image, price, quantity, status} = props
  return (
    <div className="single-order">
      <h4>{orderItem}</h4>
      <img src={image} />
      <p>
        <strong>Price: </strong>${price}
      </p>
      <p>
        <strong>Qty: </strong>
        {quantity}
      </p>
      <p>
        <strong>Status: </strong>
        {status}
      </p>
    </div>
  )
}

export default Order
