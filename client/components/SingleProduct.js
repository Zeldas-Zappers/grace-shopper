/* eslint-disable complexity */
/* eslint-disable no-warning-comments */
import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'
import {
  _addItemToCart,
  _setCartItems,
  updateProductQuantity,
} from '../store/cart'
import {me} from '../store/user'
import EditProductForm from './EditProductForm'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
export class SingleProduct extends React.Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
    // this.notifyAddToCart = this.notifyAddToCart.bind(this)
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
    this.props.getUser()

    // if user navigated elsewhere and returned to single product,
    // user information already exists in props
    if (this.props.user.id) {
      const userId = this.props.user.id
      this.props.getCartItems(userId)
    }
  }
  componentDidUpdate(prevProps) {
    // console.log('PREV PROPS', prevProps)
    // console.log('DID UPDATE -->', this.props)
    if (prevProps.user.id !== this.props.user.id) {
      if (this.props.user.id) {
        this.props.getCartItems(this.props.user.id)
      }
    }
  }

  addToCart(event) {
    event.preventDefault()
    //dispatch thunk if user (or loggedIn is true)
    if (this.props.loggedIn) {
      // check the redux state to see if item is already in cart
      // if it is, then dispatch PUT with increment quantity
      // grab the quantity from state, add 1, and pass it to the PUT
      // TODO: will update here once Rachel finishes connecting the PUT route

      // if not, then dispatch POST

      /*
      if the product already exists in user's cart,
      set a put request to increment quantity by 1
      if the product does not already exist in user's cart,
      send a post request
      */

      // console.log('hello', 'in SingleProduct addToCart props', this.props)
      const cart = this.props.cart || []
      // look through the cart and see if anything matches this product
      //
      let productExists = false
      for (let i = 0; i < cart.length; i++) {
        const productId = Number(this.props.match.params.productId)
        console.log('PRODUCT ID', productId)
        console.log('CART PRODUCT ID', cart[i].id)
        if (cart[i].id === productId) {
          productExists = true
          console.log('INSIDE LOOP', productExists)
          const quantity = {quantity: cart[i].cartItem.quantity + 1}
          const cartId = cart[i].cartItem.cartId
          this.props.updateQuantity(cartId, productId, quantity)
        }
      }
      console.log('PRODUCT EXISTS -->', productExists)
      if (!productExists)
        this.props.addItemToCart(this.props.product, this.props.user.id)
    }
    //if !loggedIn then add to local storage!!!
    let cart
    if (!this.props.loggedIn) {
      if (localStorage.getItem('cart') === null) {
        this.props.product.count++
        cart = [this.props.product]
      } else {
        cart = JSON.parse(localStorage.getItem('cart'))
        let existingCartItem = cart.find(
          (product) => product.id === this.props.product.id
        )

        if (existingCartItem) {
          existingCartItem.count++
        } else {
          this.props.product.count++
          cart.push(this.props.product)
        }
      }
      localStorage.setItem('cart', JSON.stringify(cart))
    }
    toast.success('🍁Added to cart!', {
      position: 'bottom-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    })
  }

  render() {
    console.log('THIS.PROPS', this.props)
    const {product} = this.props || {}
    const adminStatus = this.props.adminStatus || ''

    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-5 col-md-6 pr-0">
            <img src={product.imageUrl} />
          </div>
          <div className="col-lg-7 col-md-6 mt-4 pl-0">
            <h3 className="title">{product.name}</h3>
            <p className="price">$ {product.price}</p>
            <h6 className="mt-5">
              <strong>
                <em>DETAILS</em>
              </strong>
            </h6>
            <p>{product.description}.</p>
            <div className="mb-4">
              <hr className="dotted" />
            </div>
            <h6 className="mt-3">
              <strong>
                <em>PLANT CARE</em>
              </strong>
            </h6>
            <p>
              <em>Lighting: </em>
              {product.lighting}
            </p>
            <p>
              <em>Watering: </em>
              {product.watering}
            </p>
            <p>
              <em>Category: </em>
              {product.category}
            </p>
            <div className="row ">
              {!adminStatus && (
                <div className="col">
                  <button
                    onClick={this.addToCart}
                    type="button"
                    className="btn btn-lg home-button float-right"
                  >
                    Add to Cart
                  </button>
                  <ToastContainer
                    position="bottom-right"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                  />
                </div>
              )}
              {adminStatus && (
                <div className="col">
                  <p>
                    <button
                      className="btn btn-lg home-button float-right"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Edit Product
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>
          <EditProductForm />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, {match}) => {
  return {
    product: state.product,
    loggedIn: !!state.user.id,
    user: state.user,
    adminStatus: state.user.adminStatus,
    cart: state.cart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (productId) => dispatch(fetchProduct(productId)),
    addItemToCart: (product, userId) =>
      dispatch(_addItemToCart(product, userId)),

    getUser: () => dispatch(me()),
    getCartItems: (userId) => dispatch(_setCartItems(userId)),
    updateQuantity: (cartId, productId, quantity) =>
      dispatch(updateProductQuantity(cartId, productId, quantity)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
