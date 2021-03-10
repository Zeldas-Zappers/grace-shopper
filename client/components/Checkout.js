import React from 'react'
// import Cart from './cart'
import {connect} from 'react-redux'
import {_checkout} from '../store/cart'
import {Redirect, Link} from 'react-router-dom'
import {_setCartItems} from '../store/cart'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: JSON.parse(localStorage.getItem('cart')),
      orderSubmitted: false,
    }
    this.submitOrder = this.submitOrder.bind(this)
    this.redirect = this.redirect.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.user.id !== this.props.user.id ||
      prevProps.cart.length !== this.props.cart.length
    ) {
      if (this.props.user.id) {
        const userId = this.props.user.id
        this.props.getCartItems(userId)
      }
    }
  }

  submitOrder() {
    if (this.props.loggedIn) {
      const cartId = this.props.cart[0].cartItem.cartId
      this.props.clearCart(cartId)
      this.setState({
        ...this.state,
        orderSubmitted: true,
      })
    }

    if (!this.props.loggedIn) {
      this.setState({
        cart: localStorage.clear(),
        orderSubmitted: !this.state.orderSubmitted,
      })
    }

    this.redirect()
  }

  redirect() {
    setTimeout(() => {
      this.props.history.push('/products')
    }, 3000)
  }

  render() {
    const cartToRender = !this.props.loggedIn
      ? this.state.cart || []
      : this.props.cart || []

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
      console.log('logged in', subTotal)
    }

    console.log('CHECKOUT', this.props)

    return (
      <div className="checkout container mt-5 justify-content-center">
        <div className="d-flex justify-content-between">
          <h3 className="title">
            {this.state.orderSubmitted
              ? 'Thank you! Your order has been submitted'
              : 'Order Summary'}
          </h3>
          {!this.state.orderSubmitted && (
            <button
              onClick={this.submitOrder}
              type="button"
              className="btn btn-lg home-button"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Submit Order
            </button>
          )}
        </div>
        {!this.state.orderSubmitted && (
          <div className="subTotal">Total: ${subTotal}</div>
        )}
        {cartToRender.map((product) => {
          return (
            <div
              className="card mb-3 mt-5"
              style={{maxWidth: '500px'}}
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
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.user,
    loggedIn: !!state.user.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: (cartId) => dispatch(_checkout(cartId)),
    getCartItems: (userId) => dispatch(_setCartItems(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
