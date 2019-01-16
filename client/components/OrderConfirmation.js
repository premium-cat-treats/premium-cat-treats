import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrdersForConfirmation} from '../store/order'
import {createOrderSections} from '../helperFuncs'

class OrderConfirmation extends Component {
  async componentDidMount() {
    await this.props.fetchOrdersForConfirmation(this.props.match.params.orderId)
  }

  render() {
    return (
      <div className="order-history">
        <h1>Order Confirmation</h1>
        {createOrderSections(this.props.orders)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.singleOrderForConfirmation
})

const mapDispatchToProps = dispatch => ({
  fetchOrdersForConfirmation: userId =>
    dispatch(fetchOrdersForConfirmation(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation)
