import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'
const GOT_USER_INFO = 'GOT_USER_INFO'
const GOT_UPDATED_USER = 'GOT_UPDATED_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}
const defaultUsers = []

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getAllUsers = users => ({type: GET_ALL_USERS, users})
const gotUserInfo = userInfo => ({type: GOT_USER_INFO, userInfo})
const gotUpdatedUser = updatedUser => ({
  type: GOT_UPDATED_USER,
  updatedUser
})

/**
 * THUNK CREATORS
 */

export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data: users} = await axios.get('/api/users')
      dispatch(getAllUsers(users))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchSingleUser = userId => {
  return async dispatch => {
    try {
      const {data: user} = await axios.get(`/api/users/${userId}`)
      dispatch(gotUserInfo(user))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateUserById = (newUserInfo, userId) => {
  return async dispatch => {
    try {
      const {data: updatedUser} = await axios.put(
        `/api/users/${userId}`,
        newUserInfo
      )
      dispatch(gotUpdatedUser(updatedUser))
    } catch (error) {
      console.error(error)
    }
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export const user = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}

export const users = (state = defaultUsers, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case GOT_USER_INFO:
      return action.userInfo
    case GOT_UPDATED_USER:
      const updatedUser = state.map(
        user => (user.id === action.updatedUser.id ? action.updatedUser : user)
      )
      return updatedUser
    default:
      return state
  }
}
