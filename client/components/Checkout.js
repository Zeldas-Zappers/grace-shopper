import React from 'react'
import Cart from './cart'
import {connect} from 'react-redux'
import {_checkout} from '../store/cart'
import {Redirect, Link} from 'react-router-dom'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: JSON.parse(localStorage.getItem('cart')),
      orderSubmitted: false,
    }
    this.submitOrder = this.submitOrder.bind(this)
  }

  submitOrder() {
    if (this.props.loggedIn) {
      const cartId = this.props.cart[0].cartItem.cartId
      // const updatedCart = this.props.cart.map((product) => {
      //   if(product.cartItem.orderStatus === "Processing") {
      //     product.cartItem.orderStatus = "Fullfilled";
      //   }
      //   return product;
      // })
      //console.log('SUBMIT ORDER', updatedCart)
      this.props.clearCart(cartId)
      this.setState({
        ...this.state,
        orderSubmitted: true,
      })
    }

    if (!this.props.loggedIn) {
      this.setState({
        cart: localStorage.clear(),
        orderSubmitted: true,
      })
    }
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
              ? "You're order has been submitted"
              : 'Order Summary'}
          </h3>
          {!this.state.orderSubmitted && (
            <button
              onClick={this.submitOrder}
              type="button"
              className="btn home-button"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Submit Order
            </button>
          )}
        </div>
        <div className="subTotal">Total: ${subTotal}</div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Order Submitted
                </h5>
                <button
                  type="button"
                  className="close btn btn-lg button-home"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">Thank you for shopping with us!</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-lg button-home"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
