import axios from 'axios'

// want to rename this to 'get' instead of 'set'
const SET_PRODUCT = 'SET_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

//action creators

// get single product
export const setProduct = (product) => {
  return {
    type: SET_PRODUCT,
    product,
  }
}

// edit single product
export const editProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
    product,
  }
}

//thunks
// get single product
export const fetchProduct = (id) => {
  return async (dispatch) => {
    try {
      const product = (await axios.get(`/api/products/${id}`)).data
      dispatch(setProduct(product))
    } catch (err) {
      console.log(err)
    }
  }
}

// edit single product
export const updateProduct = (id, productUpdates) => {
  return async (dispatch) => {
    try {
      const product = (await axios.put(`/api/products/${id}`, productUpdates))
        .data
      dispatch(editProduct(product))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product
    case EDIT_PRODUCT:
      return action.product
    default:
      return state
  }
}
