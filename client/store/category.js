import axios from 'axios'

// CONSTANTS
const GOT_CATEGORIES = 'GOT_CATEGORIES'

// ACTION CREATORS
const gotCategories = categories => ({type: GOT_CATEGORIES, categories})

// THUNK CREATORS
export const fetchCategories = () => {
  return async dispatch => {
    try {
      const {data: categories} = await axios.get('/api/categories')
      dispatch(gotCategories(categories))
    } catch (error) {
      console.error(error)
    }
  }
}

export const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
