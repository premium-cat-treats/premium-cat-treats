import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {fetchOrders, updateOrderById} from '../store/order'
import Order from './order'

class OrderHistory extends Component {
  async componentDidMount() {
    await this.props.getUser()
    await this.props.getOrders(this.props.match.params.userId)
  }

  handleStatusChange = (event, orderId) => {
    const newOrderStatus = event.target.value
    this.props.updateOrder({status: newOrderStatus}, orderId)
  }

  render() {
    const userOrders = []
    const createOrderSections = ords => {
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
                  handleStatusChange={this.handleStatusChange}
                  user={this.props.user}
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
    }
    createOrderSections(this.props.orders)
    return (
      <div className="order-history">
        <h1>Previous Orders</h1>
        {userOrders}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  orders: state.userOrders
})

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(me()),
  getOrders: userId => dispatch(fetchOrders(userId)),
  updateOrder: (newOrderInfo, id) => dispatch(updateOrderById(newOrderInfo, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
