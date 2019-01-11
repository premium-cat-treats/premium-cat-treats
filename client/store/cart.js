// CONSTANTS
const ADD_TO_CART = 'ADD_TO_CART'

// ACTION CREATORS
export const addToCart = (product, quantity) => ({
  type: ADD_TO_CART,
  payload: {product, quantity}
})

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // If the item already exists in the cart, add to
      // the quantity already associated with the productId.
      if (state.some(item => item.product.id === action.payload.product.id)) {
        return state.map(item => {
          if (item.product.id === action.payload.product.id) {
            item.quantity = item.quantity + action.payload.quantity
          }
          return item
        })
      }

      return [...state, action.payload]
    default:
      return state
  }
}
