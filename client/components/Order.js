import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import {updateOrderById} from '../store/order'

const Order = props => {
  const {
    orderId,
    productId,
    orderItem,
    image,
    price,
    quantity,
    status,
    cancelOrder
  } = props
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
        <Button onClick={() => cancelOrder({status: 'Canceled'}, orderId)}>
          Cancel Item
        </Button>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  cancelOrder: (newOrderInfo, id) => dispatch(updateOrderById(newOrderInfo, id))
})

export default connect(null, mapDispatchToProps)(Order)
