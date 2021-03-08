import axios from 'axios'

// want to rename this to 'get' instead of 'set'
const SET_PRODUCT = 'SET_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
// const EDIT_PRODUCT_QUANTITY = 'EDIT_PRODUCT_QUANTITY'
// const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'

//action creators

// get single product
export const setProduct = (product) => {
  return {
    type: SET_PRODUCT,
    product,
  }
}

// post single product to cart
// export const addProductToCart = (product) => {
//   return {
//     type: ADD_PRODUCT_TO_CART,
//     product,
//   }
// }

// edit single product
export const editProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
    product,
  }
}

// export const editProductQuantity = (updatedProduct) => {
//   return {
//     type: EDIT_PRODUCT_QUANTITY,
//     updatedProduct,
//   }
// }

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

// // add product to cart
// export const addProductToCartThunk = (cartId) => {
//   return async (dispatch) => {
//     try {
//       const product = (await axios.post(`/api/cart/${cartId}`)).data
//       dispatch(addProductToCart(product))
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }

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

// export const updateProductQuantity = (cartId, productId, quantity) => {
//   return async (dispatch) => {
//     try {
//       const updatedProduct = (
//         await axios.put(`/api/cart/${cartId}/product/${productId}`, quantity)
//       ).data
//       dispatch(editProductQuantity(updatedProduct))
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }

const initialState = {}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product
    case EDIT_PRODUCT:
      return action.product
    // not sure if we need to update state to include an array of products, since
    // case ADD_PRODUCT_TO_CART:
    //   return action.product
    // case EDIT_PRODUCT_QUANTITY:
    //   // return state.map((product) =>
    //   //   product.id === action.product.id ? action.product : product
    //   // )
    //   return action.updatedProduct
    default:
      return state
  }
}
