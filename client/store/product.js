import axios from 'axios'

// want to rename this to 'get' instead of 'set'
const SET_PRODUCT = 'SET_PRODUCT'

//action creators

// get single product
export const setProduct = (product) => {
  return {
    type: SET_PRODUCT,
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

const initialState = {
  product: {},
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return {...state, product: action.product}
    default:
      return state
  }
}
