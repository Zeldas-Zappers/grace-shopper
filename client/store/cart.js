import axios from 'axios'

//Action type
const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'

//Action creator
export const fetchCartItems = products => {
  return {
    type: FETCH_CART_ITEMS,
    products
  }
}

export const addItemToCart = product => {
  return {
    type: ADD_ITEM_TO_CART,
    product
  }
}

export const removeItemFromCart = product => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    product
  }
}

//Thunk
export const _setCartItems = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${userId}`)
      dispatch(fetchCartItems(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const _addItemToCart = product => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cart', product)
      dispatch(addItemToCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const _removeItemFromCart = product => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/cart/${product.id}`)
      dispatch(removeItemFromCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

//Sub-reducer
const initialState = []
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CART_ITEMS:
      return action.products
    case ADD_ITEM_TO_CART:
      return [...state, action.product]
    case REMOVE_ITEM_FROM_CART:
      return state.filter(product => product.id !== action.product.id)
    default:
      return state
  }
}
