import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {fetchOrders} from '../store/order'
import Order from './order'

class OrderHistory extends Component {
  async componentDidMount() {
    await this.props.getUser()
    await this.props.getOrders(this.props.user.id)
  }

  render() {
    const userOrders = []
    const createOrderSections = ords => {
      const ordKeys = Object.keys(ords)
      ordKeys.forEach(key => {
        const orderGroup = (
          <div key={key} className="single-order-history">
            <h3>
              <strong>Order Total: </strong>
              ${(ords[key][0].orderTotal.totalCents / 100).toFixed(2)}
            </h3>
            <h4>
              <strong>Date: </strong>
              {ords[key][0].orderTotal.orderDate}
            </h4>
            {ords[key].map(singleOrder => {
              return (
                <Order
                  key={singleOrder.id}
                  orderItem={singleOrder.product.title}
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
        <h1>Order History</h1>
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
  getOrders: userId => dispatch(fetchOrders(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
