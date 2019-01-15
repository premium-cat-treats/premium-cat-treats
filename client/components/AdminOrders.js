import React, {Component} from 'react'
import AdminDashboard from './AdminDashboard'
import {connect} from 'react-redux'
import {Step} from 'semantic-ui-react'
//TODO: Add frame for Order Processing Status Changer when Orders Component is ready
const steps = [
  {
    key: 'shipping',
    icon: 'truck',
    title: 'Shipping',
    description: 'Choose your shipping options'
  },
  {
    key: 'billing',
    active: true,
    icon: 'payment',
    title: 'Billing',
    description: 'Enter billing information'
  },
  {key: 'confirm', disabled: true, icon: 'info', title: 'Confirm Order'}
]
class AdminOrders extends Component {
  render() {
    return (
      <div>
        <AdminDashboard />

        <div>
          <h2>Admin Orders</h2>
        </div>
        <h2>Admin Orders</h2>
        <Step.Group items={steps} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.userOrders
})

const mapDispatchToProps = dispatch => ({
  fetchAllOrders: () => dispatch(fetchAllOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders)
