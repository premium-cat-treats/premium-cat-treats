import React from 'react'
import Order from './components/Order'

// Creates grouped order section for OrderConfirmations.js
export const createOrderSections = ords => {
  const userOrders = []

  const ordKeys = Object.keys(ords)
  ordKeys.forEach(key => {
    const orderGroup = (
      <div key={key} className="single-order-history">
        <p
          style={{
            fontSize: '22px',
            marginBottom: '0',
            display: 'inline-block'
          }}
        >
          <strong>Order Total: </strong>
          ${(ords[key][0].orderTotal.totalCents / 100).toFixed(2)}
        </p>
        <p
          className="order-id"
          style={{fontSize: '14px', display: 'inline-block'}}
        >
          <strong>Order Id: </strong>
          {ords[key][0].orderTotal.id}
        </p>
        <p style={{fontSize: '16px'}}>
          <strong>Order Placed: </strong>
          {ords[key][0].orderTotal.orderDate.slice(0, 10)}
        </p>
        {ords[key].map(singleOrder => {
          return (
            <Order
              key={singleOrder.id}
              orderId={singleOrder.id}
              orderItem={singleOrder.product.title}
              productId={singleOrder.product.id}
              image={singleOrder.product.imageUrl}
              price={(singleOrder.historicalPriceCents / 100).toFixed(2)}
              quantity={singleOrder.quantityOrdered}
              status={singleOrder.status}
            />
          )
        })}
      </div>
    )
    userOrders.push(orderGroup)
  })

  return userOrders
}
