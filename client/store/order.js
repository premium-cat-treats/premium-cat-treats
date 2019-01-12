import axios from 'axios'

const GOT_ORDERS = 'GOT_ORDERS'
const gotOrders = payload => ({type: GOT_ORDERS, payload})

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

export const userOrders = (state = {}, action) => {
  switch (action.type) {
    case GOT_ORDERS:
      return action.payload
    default:
      return state
  }
}
