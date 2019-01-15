import React, {Component} from 'react'
import AdminDashboard from './AdminDashboard'
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
  componentDidMount() {}
  render() {
    return (
      <div>
        <AdminDashboard />
        <h2>Admin Orders</h2>
        <Step.Group items={steps} />
      </div>
    )
  }
}

export default AdminOrders
