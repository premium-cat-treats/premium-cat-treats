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
  const statusStyle =
    status === 'Canceled'
      ? {display: 'inline-block', color: '#944317'}
      : status === 'Completed'
        ? {display: 'inline-block', color: '#5C9210'}
        : status === 'Processing'
          ? {display: 'inline-block', color: '#F4A460'}
          : {display: 'inline-block', color: 'black'}
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
        <div className="single-order-paragraph">
          <p style={{display: 'inline-block', marginRight: '.5rem'}}>
            <strong>Status: </strong>
          </p>
          <p style={statusStyle}>{status}</p>
        </div>
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
