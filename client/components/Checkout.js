import React from 'react'
import Cart from './cart'
import {connect} from 'react-redux'
import {_checkout} from '../store/cart'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: JSON.parse(localStorage.getItem('cart')),
    }
    this.submitOrder = this.submitOrder.bind(this)
  }

  submitOrder() {
    if (this.props.user.id) {
      const cartId = this.props.cart[0].cartItem.cartId
      console.log('CART ID', cartId)
      this.props.clearCart(cartId)
    } else {
      this.setState({
        cart: localStorage.clear(),
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
      <div className="checkout container">
        <h1>Order Summary</h1>
        <button
          onClick={this.submitOrder}
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Submit Order
        </button>
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
                  className="close"
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
                  className="btn btn-secondary"
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
              className="card mb-3"
              style={{maxWidth: '800px'}}
              key={product.id}
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={product.imageUrl} className="card-img" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">${product.price}</p>
                    <p className="list-item">
                      Quantity:{' '}
                      {!this.props.loggedIn
                        ? product.count
                        : product.cartItem.quantity}
                    </p>
                    <p className="card-text">{product.description}</p>
                    <p className="list-item">{product.lighting}</p>
                    <p className="list-item">{product.watering}</p>
                  </div>
                </div>
              </div>
            </div>
            // <div key={product.id}>
            //   <div className="row mt-4">
            //     <div className="col-lg-4 col-md-6">
            //       <div className="row">
            //         <div className="col-md-12">
            //           <img alt="whatever alt we want" src={product.imageUrl} />
            //         </div>
            //       </div>
            //     </div>
            //     <div className="col-lg-8 col-md-6">
            //       <div className="row">
            //         <div className="col-md-12">
            //           <ul>
            //             <li className="list-item">{product.name}</li>
            //             <li className="list-item">${product.price}</li>
            //             <li className="list-item">
            //               Quantity:{' '}
            //               {!this.props.loggedIn
            //                 ? product.count
            //                 : product.cartItem.quantity}
            //             </li>
            //             <li className="list-item">{product.description}</li>
            //             <li className="list-item">{product.lighting}</li>
            //             <li className="list-item">{product.watering}</li>
            //           </ul>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // </div>
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
