import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

//action creators
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  }
}

// create single product
export const createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
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

// delete single product
export const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
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

// create single product
export const addNewProduct = (newProduct) => {
  return async (dispatch) => {
    try {
      const createdProduct = (await axios.post('/api/products', newProduct))
        .data
      dispatch(createProduct(createdProduct))
    } catch (err) {
      console.error(err)
    }
  }
}

// edit single product
export const _editProduct = (product, productId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/products/${productId}`, product)
      dispatch(editProduct(data))
    } catch (err) {
      console.error(err)
    }
  }
}

// delete single product
export const removeProduct = (product, history) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/products/${product.id}`)
      dispatch(deleteProduct(product))
      history.push('/products')
    } catch (err) {
      console.error(err)
    }
  }
}

//sub-reducer
const initialState = []

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case CREATE_PRODUCT:
      return [...state, action.product]
    case EDIT_PRODUCT:
      return state.map((product) =>
        product.id === action.product.id ? action.product : product
      )
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id)
    default:
      return state
  }
}
