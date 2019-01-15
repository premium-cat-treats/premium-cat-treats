import axios from 'axios'
import order from '../components/order'

const GOT_ORDERS = 'GOT_ORDERS'
const GOT_UPDATED_ORDER = 'GOT_UPDATED_ORDER'

const gotOrders = payload => ({type: GOT_ORDERS, payload})
export const gotUpdatedOrder = updatedOrder => ({
  type: GOT_UPDATED_ORDER,
  updatedOrder
})

export const fetchOrders = userId => {
  return async dispatch => {
    try {
      const {data: orders} = await axios.get(`/api/orders/${userId}`)
      dispatch(gotOrders(orders))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateOrderById = (newOrderInfo, id) => {
  return async dispatch => {
    const {data: updatedOrder} = await axios.put(
      `/api/order/${id}`,
      newOrderInfo
    )
    dispatch(gotUpdatedOrder(updatedOrder))
  }
}

export const postOrder = (totalCents, arrayOfCartItems, userId) => {
  return async dispatch => {
    const {data: orderTotal} = await axios.post('/api/order-total/', {
      totalCents
    })
    console.log(orderTotal)
    const orders = arrayOfCartItems.map(async item => {
      const itemData = {
        historicalPriceCents: item.product.priceCents,
        quantityOrdered: item.quantity,
        productId: item.product.id,
        userId: userId,
        orderTotalId: orderTotal.id
      }
      const {data: orderData} = await axios.post('/api/order/', itemData)
      return orderData
    })
  }
}

export const userOrders = (state = {}, action) => {
  switch (action.type) {
    case GOT_ORDERS:
      return action.payload
    case GOT_UPDATED_ORDER:
      const updatedState = {}
      const stateKeys = Object.keys(state)
      stateKeys.forEach(key => {
        updatedState[key] = state[key].map(o => {
          return o.id === action.updatedOrder.id ? action.updatedOrder : o
        })
      })
      return updatedState
    default:
      return state
  }
}
