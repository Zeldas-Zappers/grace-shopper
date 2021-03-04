import axios from 'axios'

//Action type
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'

//Action creator
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
    case ADD_ITEM_TO_CART:
      return [...state, action.product]
    case REMOVE_ITEM_FROM_CART:
      return state.filter(product => product.id !== action.product.id)
    default:
      return state
  }
}

//User clicks on 'add to cart'
//handleSubmit function on button dispatches "_addItemToCart" thunk from single product view
//User is redirected to cart
//cart array in store is mapped to props on cart component and renders when new cart items are added or deleted

//User clicks on "dete item from cart"
//delete item from cart function dispatches "_removeItemFromCart" thunk from cart component
//"_removeItemFromCart" thunk is mappedToDispatch on cart component
