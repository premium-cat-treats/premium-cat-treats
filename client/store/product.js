import axios from 'axios'

const GOT_PRODUCTS = 'GOT_PRODUCTS'
const GOT_PRODUCT_INFO = 'GOT_PRODUCT_INFO'
const GOT_FILTERED_PRODUCTS = 'GET_PRODUCTS'
const GOT_NEW_PRODUCT = 'GOT_NEW_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const GOT_UPDATED_PRODUCT = 'GOT_UPDATED_PRODUCT'

const gotProducts = products => ({type: GOT_PRODUCTS, products})
const gotProductInfo = productInfo => ({type: GOT_PRODUCT_INFO, productInfo})
const gotNewProduct = newProduct => ({type: GOT_NEW_PRODUCT, newProduct})
const deleteProduct = removedProductId => ({
  type: DELETE_PRODUCT,
  removedProductId
})
const gotUpdatedProduct = updatedProduct => ({
  type: GOT_UPDATED_PRODUCT,
  updatedProduct
})
const gotFilteredProducts = filteredProducts => ({
  type: GOT_FILTERED_PRODUCTS,
  filteredProducts
})

// const fetchingProducts = () => ( { type: PRODUCTS_REQUEST} )
// const fetchingProductInfo = () => ( { type: PRODUCTS_INFO_REQUEST } )
// const productError = error => ( { type: PRODUCT_ERROR, error } )
//May not need the above three action creators, depending on where we decide to handle errors
//and/or loading bar

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data: products} = await axios.get('/api/products')
      dispatch(gotProducts(products))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchAndFilterProducts = productCategoryId => {
  return async dispatch => {
    try {
      const {data: products} = await axios.get('/api/products')
      const filteredProducts = products.filter(
        product => product.categoryId === productCategoryId
      )
      dispatch(gotFilteredProducts(filteredProducts))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchSingleProduct = productId => {
  return async dispatch => {
    try {
      const {data: product} = await axios.get(`/api/products/${productId}`)
      dispatch(gotProductInfo(product))
    } catch (error) {
      console.error(error)
    }
  }
}

export const postNewProduct = productInfo => {
  return async dispatch => {
    try {
      const {data: newProduct} = await axios.post('/api/products', productInfo)
      dispatch(gotNewProduct(newProduct))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteProductById = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${productId}`)
      dispatch(deleteProduct(productId))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateProductById = (newProductInfo, productId) => {
  return async dispatch => {
    try {
      const {data: updatedProduct} = await axios.put(
        `/api/products/${productId}`,
        newProductInfo
      )
      dispatch(gotUpdatedProduct(updatedProduct))
    } catch (error) {
      console.error(error)
    }
  }
}

export const products = (state = [], action) => {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products
    case GOT_FILTERED_PRODUCTS:
      return action.filteredProducts
    case GOT_NEW_PRODUCT:
      return [...state, action.newProduct]
    case DELETE_PRODUCT:
      const newState = state.filter(
        product => product.id !== action.removedProductId
      )
      return newState
    case GOT_UPDATED_PRODUCT:
      const updatedProducts = state.map(
        product =>
          product.id === action.updatedProduct.id
            ? action.updatedProduct
            : product
      )
      return updatedProducts
    default:
      return state
  }
}

export const currentProduct = (state = {}, action) => {
  switch (action.type) {
    case GOT_PRODUCT_INFO:
      return action.productInfo
    case GOT_UPDATED_PRODUCT:
      return action.updatedProduct
    default:
      return state
  }
}
