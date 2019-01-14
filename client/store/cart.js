// CONSTANTS
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'
const DELETE_ITEM = 'DELETE_ITEM'

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
    default:
      return state
  }
}
