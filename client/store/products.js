import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'

//action creators
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  }
}

//thunks
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const products = (await axios.get('/api/products')).data
      dispatch(setProducts(products))
    } catch (err) {
      console.log(err)
    }
  }
}

//sub-reducer
const initialState = []

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
