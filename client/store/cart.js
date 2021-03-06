// CONSTANTS
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'
const DELETE_ITEM = 'DELETE_ITEM'
const CLEAR_CART = 'CLEAR_CART'

// ACTION CREATORS
export const addToCart = (product, quantity) => ({
  type: ADD_TO_CART,
  payload: {product, quantity}
})

export const updateItemQuantity = (product, quantity) => ({
  type: UPDATE_ITEM_QUANTITY,
  payload: {product, quantity}
})

export const deleteItem = productId => ({
  type: DELETE_ITEM,
  productId
})

export const clearCart = () => ({
  type: CLEAR_CART
})

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // If the item already exists in the cart, add to
      // the quantity already associated with the productId.
      if (state.some(item => item.product.id === action.payload.product.id)) {
        return state.map(item => {
          if (item.product.id === action.payload.product.id) {
            const newItem = {...item}
            newItem.quantity = item.quantity + action.payload.quantity
            return newItem
          }
          return item
        })
      }
      return [...state, action.payload]
    case UPDATE_ITEM_QUANTITY:
      return state.map(item => {
        if (item.product.id === action.payload.product.id) {
          const newItem = {...item}
          newItem.quantity = action.payload.quantity
          return newItem
        }
        return item
      })
    case DELETE_ITEM:
      return state.filter(item => item.product.id !== action.productId)
    case CLEAR_CART:
      return []
    default:
      return state
  }
}

// Selector function
export const totalPriceCents = state => {
  return state.cart.reduce(
    (total, cartItem) =>
      total + cartItem.product.priceCents * cartItem.quantity,
    0
  )
}
