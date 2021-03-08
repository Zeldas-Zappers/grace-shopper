import React from 'react'
import {connect} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import {CardElement} from '@stripe/react-stripe-js'
import axios from 'axios'
import {_setCartItems} from '../store/cart'
import {me} from '../store/user'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Cart from './cart'

const STRIPE_PUBLISHABLE =
  'pk_test_51ISFmqJJyJ8QC0zSQwtLsbjkmEZz47FfOwrYvUNoKJZ928pnsuWqblRR23cE02OXngSMjE6TQkm8BqeG1eFOMBOV006Bcbs3eu'
const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://seeds.herokuapp.com'
    : 'http://localhost:8080'

class Checkout extends React.Component {
  handleToken(token, addresses) {
    console.log({token, addresses})
  }
  render() {
    console.log('CHECKOUT', this.props)
    const cart = this.props.cart || []
    const subTotal = cart
      .map((product) => product.count * product.price)
      .reduce((a, b) => a + b, 0)
    return (
      <div className="checkout container">
        <div className="orders">
          {cart.map((product) => {
            return (
              <div key={product.id}>
                <p>{product.name}</p>
                <p>{product.price}</p>
                <p>{product.count}</p>
              </div>
            )
          })}
          <p>Subtotal: {subTotal}</p>
        </div>
        <StripeCheckout
          stripeKey="pk_test_51ISFmqJJyJ8QC0zSQwtLsbjkmEZz47FfOwrYvUNoKJZ928pnsuWqblRR23cE02OXngSMjE6TQkm8BqeG1eFOMBOV006Bcbs3eu"
          token={this.handleToken}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('STATE', state)
  return {
    cart: state.cart,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCartItems: (userId) => dispatch(_setCartItems(userId)),
    getUser: () => dispatch(me()),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
)
