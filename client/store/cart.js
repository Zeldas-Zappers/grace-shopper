import axios from 'axios'

//Action type
const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
const EDIT_PRODUCT_QUANTITY = 'EDIT_PRODUCT_QUANTITY'
const CHECKOUT = 'CHECKOUT'

//Action creator
export const fetchCartItems = (products) => {
  return {
    type: FETCH_CART_ITEMS,
    products,
  }
}

export const addItemToCart = (product) => {
  return {
    type: ADD_ITEM_TO_CART,
    product,
  }
}

export const removeItemFromCart = (product) => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    product,
  }
}

export const editProductQuantity = (updatedProduct) => {
  return {
    type: EDIT_PRODUCT_QUANTITY,
    updatedProduct,
  }
}

export const checkout = () => {
  return {
    type: CHECKOUT,
  }
}

//Thunk

export const _setCartItems = (userId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/cart/${userId}`)
      dispatch(fetchCartItems(data))
      console.log('in _setCartItems thunk data', data)
    } catch (err) {
      console.error(err)
    }
  }
}

export const _addItemToCart = (product, userId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post(`/api/cart/${userId}`, product)
      console.log('hello', 'in addItem thunk', 'product', product, 'data', data)
      dispatch(addItemToCart(data))

      // history.push('/cart')
    } catch (err) {
      console.error(err)
    }
  }
}

export const _removeItemFromCart = (product) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.delete(`/api/cart/${product.id}`)
      dispatch(removeItemFromCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateProductQuantity = (cartId, productId, quantity) => {
  return async (dispatch) => {
    try {
      const updatedProduct = (
        await axios.put(`/api/cart/${cartId}/product/${productId}`, quantity)
      ).data
      dispatch(editProductQuantity(updatedProduct))
    } catch (err) {
      console.error(err)
    }
  }
}

//checkout/clear cart
export const _checkout = (cartId) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/orders/${cartId}`)
      //not sending data because we ultimately want to delete items from cart in state
      dispatch(checkout())
    } catch (err) {
      next(err)
    }
  }
}

//Sub-reducer
const initialState = []
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CART_ITEMS:
      return action.products
    // unnecessary b/c we will check state for the quantity
    // case ADD_ITEM_TO_CART: {
    //   // find out if the product is already in cart
    //   let alreadyInCart = false
    //   let quantityOfProductInCart
    //   let idx
    //   // loop through the cart and try to match the product id
    //   for (let i = 0; i < state.length; i++) {
    //     if (state[i].id === action.product.id) {
    //       quantityOfProductInCart = action.product.cartItem.quantity
    //       idx = i
    //       alreadyInCart = true
    //       break
    //     }
    //   }
    //   if (alreadyInCart) {
    //     var updatedProductQuantity
    //     updatedProductQuantity = quantityOfProductInCart + 1
    //     const result = [...state]
    //     result[idx].cartItem.quantity = updatedProductQuantity
    //     return result
    //   } else {
    //     return [...state, action.product]
    //   }
    // }
    case ADD_ITEM_TO_CART:
      // this has to be action.product and not [...state, action.product] because of the way the route is configured to get all the products in the cart and because the backend route returns the entire array of products, not just the new product. Not sure if this is best practice
      return action.product
    case REMOVE_ITEM_FROM_CART:
      return state.filter((product) => product.id !== action.product.id)
    case EDIT_PRODUCT_QUANTITY:
      return state.map((product) =>
        product.id === action.product.id ? action.product : product
      )
    case CHECKOUT:
      state = []
      return state
    default:
      return state
  }
}
