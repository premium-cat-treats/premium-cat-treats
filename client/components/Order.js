import React from 'react'
import {connect} from 'react-redux'
import {Button, Dropdown} from 'semantic-ui-react'
import {updateOrderById} from '../store/order'
import {me} from '../store/user'

const Order = props => {
  const {
    orderId,
    productId,
    orderItem,
    image,
    price,
    quantity,
    status,
    updateOrder,
    user
  } = props

  const statusOptions = [
    {key: 'Cr', value: 'Created', text: 'Created'},
    {key: 'Pr', value: 'Processing', text: 'Processing'},
    {key: 'Ca', value: 'Canceled', text: 'Canceled'},
    {key: 'Co', value: 'Completed', text: 'Completed'}
  ]
  const statusStyle =
    status === 'Canceled'
      ? {display: 'inline-block', color: '#944317'}
      : status === 'Completed'
        ? {display: 'inline-block', color: '#5C9210'}
        : status === 'Processing'
          ? {display: 'inline-block', color: '#F4A460'}
          : {display: 'inline-block', color: 'black'}
  const options = ['Created', 'Processing', 'Canceled', 'Completed'].map(
    (option, i) => <option key={option + i}>{option}</option>
  )
  return user ? (
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
        {user.adminAccess ? (
          <select
            className="select-status"
            defaultValue={status}
            onChange={event =>
              updateOrder({status: event.target.value}, orderId)
            }
          >
            {options}
          </select>
        ) : (
          <Button onClick={() => updateOrder({status: 'Canceled'}, orderId)}>
            Cancel Item
          </Button>
        )}
      </div>
    </div>
  ) : null
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  updateOrder: (newOrderInfo, id) =>
    dispatch(updateOrderById(newOrderInfo, id)),
  getActiveUser: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(Order)
