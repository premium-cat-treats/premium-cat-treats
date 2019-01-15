import axios from 'axios'

const GOT_ORDERS = 'GOT_ORDERS'
const GOT_UPDATED_ORDER = 'GOT_UPDATED_ORDER'
const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'

const gotOrders = payload => ({type: GOT_ORDERS, payload})
export const gotUpdatedOrder = updatedOrder => ({
  type: GOT_UPDATED_ORDER,
  updatedOrder
})
const gotAllOrders = payload => ({type: GOT_ALL_ORDERS, payload})

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

export const fetchAllOrders = () => {
  return async dispatch => {
    try {
      const {data: orders} = await axios.get('/api/orders')
      dispatch(gotAllOrders(orders))
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

export const userOrders = (state = {}, action) => {
  switch (action.type) {
    case GOT_ORDERS:
      return action.payload
    case GOT_ALL_ORDERS:
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
