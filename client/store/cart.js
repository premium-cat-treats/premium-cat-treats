// CONSTANTS
const ADD_TO_CART = 'ADD_TO_CART'

// ACTION CREATORS
export const addToCart = (productId, quantity) => ({
  type: ADD_TO_CART,
  payload: {productId, quantity}
})

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload]
    default:
      return state
  }
}
