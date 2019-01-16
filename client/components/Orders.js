import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from '../store/user'
import {fetchOrders} from '../store/order'
import Order from './Order'
import {withRouter} from 'react-router-dom'

class OrderHistory extends Component {
  async componentDidMount() {
    console.log('ORDER COMPONENT:', this.props.match.params.userId)
    await this.props.getUser(parseInt(this.props.match.params.userId, 10))
    await this.props.getOrders(this.props.user.id)
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
  user: state.users,
  orders: state.userOrders
})

const mapDispatchToProps = dispatch => ({
  getUser: id => dispatch(fetchSingleUser(id)),
  getOrders: userId => dispatch(fetchOrders(userId))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
)
