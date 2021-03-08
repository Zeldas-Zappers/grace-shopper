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

export class SingleProduct extends React.Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
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
  }

  render() {
    console.log('THIS.PROPS', this.props)
    const {product} = this.props || {}
    const adminStatus = this.props.adminStatus || ''

    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-lg-5 col-md-6">
            <img src={product.imageUrl} />
          </div>
          <div className="col-lg-7 col-md-6">
            <h3>{product.name}</h3>
            <p>
              <strong>$ {product.price}</strong>
            </p>
            <div className="row">
              <div className="col-md-2">
                <p>
                  <strong>
                    <em>Details</em>
                  </strong>
                </p>
              </div>
              <div className="col-md-10">
                <dl>
                  <dd>{product.description}.</dd>
                </dl>
              </div>
            </div>
            <div className="row">
              <div className="col-md-2">
                <p>
                  <strong>
                    <em>Plant Care</em>
                  </strong>
                </p>
              </div>
              <div className="col-md-10">
                <dl>
                  <p>
                    <em>Lighting: </em>
                    {product.lighting}
                  </p>
                </dl>
                <dl>
                  <p>
                    <em>Watering: </em>
                    {product.watering}
                  </p>
                </dl>
                <dl>
                  <p>
                    <em>Category: </em>
                    {product.category}
                  </p>
                </dl>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <button
                  onClick={this.addToCart}
                  type="button"
                  className="btn btn-success"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          {adminStatus && (
            <div className="col mt-4">
              <EditProductForm />
            </div>
          )}
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
