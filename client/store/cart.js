import axios from 'axios'

//Action type
const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'

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

//Thunk
export const _setCartItems = (products) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/cart') //needs to be cart/cartId but not sure how to generate cartId for guest
      dispatch(fetchCartItems(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const _addItemToCart = (product, userId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post(`/api/cart/${userId}`, product)
      console.log('hello', 'in addItem thunk', 'product', product)
      dispatch(addItemToCart(data))
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
      return [...state, action.product]
    case REMOVE_ITEM_FROM_CART:
      return state.filter((product) => product.id !== action.product.id)
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
