/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {Redirect, Route} from 'react-router-dom'
import {
  _setCartItems,
  updateProductQuantity,
  _removeItemFromCart,
} from '../store/cart'
import {me} from '../store/user'
import Checkout from './Checkout'
import {Link} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EmptyCartMessage from './EmptyCartMessage'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: JSON.parse(localStorage.getItem('cart')),
      quantity: 1,
      checkout: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.removefromCart = this.removefromCart.bind(this)
  }

  componentDidMount() {
    // this should only get me new info if we refresh on the Cart component
    this.props.getUser()

    // if user navigated to the cart from elsewhere, we already have user info
    // so we can fetch the cart
    if (this.props.user.id) {
      const userId = this.props.user.id
      this.props.getCartItems(userId)
    }
  }

  handleClick() {
    this.setState({checkout: true})
  }

  handleChange(evt) {
    this.setState({quantity: evt.target.value})
  }

  handleSubmit(evt, productId) {
    evt.preventDefault()
    toast.success('Quantity updated!', {
      position: 'bottom-right',
      autoClose: 5001,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    })
    if (this.props.loggedIn) {
      let cart = this.props.cart || []
      let cartId = cart[0].cartItem.cartId
      // quantity variable is the req.body to send to put route
      let quantity = {quantity: this.state.quantity}
      this.props.updateQuantity(cartId, productId, quantity)
    } else {
      const newCart = [...this.state.cart]
      const productToUpdate = newCart.find(
        (product) => product.id === productId
      )
      productToUpdate.count = this.state.quantity
      const idx = newCart.indexOf(productToUpdate)
      newCart.splice(idx, 1, productToUpdate)
      localStorage.setItem('cart', JSON.stringify(newCart))
      this.setState({cart: newCart})
    }
  }

  removefromCart(productId) {
    if (this.props.loggedIn) {
      const cartId = this.props.cart[0].cartItem.cartId
      this.props.removeCartItem(cartId, productId)
    }
    // console.log("REMOVE CART", this.props.cart[0].cartItem.cartId)
    if (!this.props.loggedIn) {
      const updatedCart = this.state.cart.filter(
        (item) => item.id !== productId
      )
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      this.setState({
        cart: updatedCart,
      })
    }
    toast.warn('Item removed', {
      position: 'bottom-right',
      autoClose: 5001,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.cart.length === 0) {
    //   console.log('cart is empty!!')
    //   return
    // }
    // comparing previous subtotal to current subtotal for scenarios in which user updates quantity
    const prevSubtotal = prevProps.cart
      .map((product) => product.cartItem.quantity * product.cartItem.price)
      .reduce((a, b) => a + b, 0)
    const currSubtotal = this.props.cart
      .map((product) => product.cartItem.quantity * product.cartItem.price)
      .reduce((a, b) => a + b, 0)
    if (
      prevProps.user.id !== this.props.user.id ||
      prevProps.cart.length !== this.props.cart.length ||
      prevSubtotal !== currSubtotal
    ) {
      // this.state = {
      // did you check if the cart is empty? : false
      // }
      if (this.props.user.id) {
        // console.log(
        //   'in Cart componentDidMount before getCartItems thunk,this.props.user.id',
        //   this.props.user.id
        // )

        const userId = this.props.user.id
        // console.log(
        //   'in Cart componentDidMount',
        //   'userId',
        //   userId,
        //   'about to run getCartItems'
        // )
        this.props.getCartItems(userId)
        // if cart is still empty, set flag to true
      }
    }
  }

  render() {
    // console.log('props are *************', 'props', this.props)
    // console.log('state is ***************', 'state', this.state)
    // console.log('cart props***************', this.props.cart)
    // console.log('product props*************', this.props.product)
    // console.log('user props****************', this.props.user)

    console.log('**********CART*********', this.props.cart)

    const cartToRender = !this.props.loggedIn
      ? this.state.cart || []
      : this.props.cart || []

    // if (cartToRender.length === 0) {
    //   return <div>Your cart is empty!!!</div>
    // }
    // define the subtotal for guests
    let subTotal
    if (!this.props.loggedIn) {
      subTotal = cartToRender
        .map((product) => product.count * product.price)
        .reduce((a, b) => a + b, 0)
    }

    // define subtotal for users
    if (this.props.loggedIn) {
      subTotal = cartToRender
        .map((product) => product.cartItem.quantity * product.cartItem.price)
        .reduce((a, b) => a + b, 0)
    }
    // if the cart is empty, display an empty cart message

    return (
      <div className="container container mt-5">
        {cartToRender.length ? (
          <div>
            <div className="d-flex justify-content-between">
              <h3 className="title">Items currently in your cart</h3>
              <Link to="/checkout">
                <button
                  type="button"
                  className="btn home-button btn-lg"
                  onClick={() => this.handleClick()}
                >
                  Proceed to checkout
                </button>
              </Link>
            </div>
            <p className="subTotal">Total: ${subTotal}</p>
          </div>
        ) : (
          <EmptyCartMessage />
        )}
        {cartToRender.map((product) => {
          return (
            <div
              className="card mb-3 mt-5"
              style={{maxWidth: '700px'}}
              key={product.id}
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src={product.imageUrl}
                    className="card-img checkout-img"
                  />
                </div>
                <div className="col-md-8 mt-4">
                  <div className="card-body">
                    <h5 className="card-title checkout-card-title">
                      {product.name}
                    </h5>
                    <p className="card-text checkout-card-text">
                      ${product.price}
                    </p>
                    <p className="card-text checkout-card-text">
                      Quantity:{' '}
                      {!this.props.loggedIn
                        ? product.count
                        : product.cartItem.quantity}
                    </p>
                  </div>
                  <form
                    className="main-form"
                    onSubmit={(evt) => this.handleSubmit(evt, product.id)}
                  >
                    <div className="form-group">
                      <label htmlFor="quantity">Quantity:</label>
                      <input
                        type="number"
                        min="1"
                        name="quantity"
                        value={this.state.quantity}
                        onChange={this.handleChange}
                        className="form-control"
                      />
                    </div>
                    <button
                      className="btn home-button btn-sm mr-2"
                      type="submit"
                    >
                      Update Quantity
                    </button>

                    <button
                      onClick={() => this.removefromCart(product.id)}
                      type="button"
                      className="btn home-button btn-sm"
                    >
                      Remove from cart
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )
        })}
        {/* {cartToRender.map((product) => {
          return (
            <div key={product.id}>
              <div className="row mt-4">
                <div className="col-lg-4 col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <img alt="whatever alt we want" src={product.imageUrl} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mt-4">
                      <button
                        onClick={() => this.removefromCart(product.id)}
                        type="button"
                        className="btn btn-warning"
                      >
                        Remove from cart
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <ul>
                        <li className="list-item">{product.name}</li>
                        <li className="list-item">${product.price}</li>
                        <li className="list-item">
                          Quantity:{' '}
                          {!this.props.loggedIn
                            ? product.count
                            : product.cartItem.quantity}
                        </li>
                        <li className="list-item">{product.description}</li>
                        <li className="list-item">{product.lighting}</li>
                        <li className="list-item">{product.watering}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <form
                        className="main-form"
                        onSubmit={(evt) => this.handleSubmit(evt, product.id)}
                      >
                        <div className="form-group">
                          <label htmlFor="quantity">Quantity:</label>
                          <input
                            type="number"
                            min="1"
                            name="quantity"
                            value={this.state.quantity}
                            onChange={this.handleChange}
                            className="form-control"
                          />
                        </div>
                        <button className="btn btn-info" type="submit">
                          Update Quantity
                        </button>
                        {console.log('TOAST')}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })} */}
        {/* <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <p>Subtotal: ${subTotal}</p>
              </div>
            </div>
            <div className="row">
              {cartToRender.length ? (
                <div className="col-md-12">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => this.handleClick()}
                  >
                    Proceed to checkout
                  </button>
                  {this.state.checkout && <Redirect to="/checkout" />}
                </div>
              ) : (
                'Your cart is empty'
              )}
            </div>
          </div>
        </div> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    cart: state.cart,
    loggedIn: !!state.user.id,
    user: state.user,
  }
}

const mapDispatchToCart = (dispatch) => {
  return {
    getCartItems: (userId) => dispatch(_setCartItems(userId)),
    getUser: () => dispatch(me()),
    updateQuantity: (cartId, productId, updatedProduct) =>
      dispatch(updateProductQuantity(cartId, productId, updatedProduct)),
    removeCartItem: (cartId, productId) =>
      dispatch(_removeItemFromCart(cartId, productId)),
  }
}

// later refactor: rename to mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToCart)(Cart)
