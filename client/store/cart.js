// CONSTANTS
const ADD_TO_CART = 'ADD_TO_CART'

// ACTION CREATORS
export const addToCart = (product, quantity) => ({
  type: ADD_TO_CART,
  payload: {product, quantity}
})

//
// ==== TEMPORARY! DELETE AND RESET STATE TO = [] =======
const tempState = [
  {
    product: {
      id: 1,
      title: 'Shepards Pie',
      description:
        'Give your cat a trip to the English country side with minced red meat, cooked in a gravy with onions, vegetables, and topped with catnip',
      priceCents: 299,
      quantity: 50,
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Cat_illustration.jpg/120px-Cat_illustration.jpg',
      deleted: false
    },
    quantity: 1
  }
]

export const cartReducer = (state = tempState, action) => {
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
