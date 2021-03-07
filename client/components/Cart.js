import React from 'react'
import {connect} from 'react-redux'
import {_setCartItems} from '../store/cart'
import {me} from '../store/user'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: JSON.parse(localStorage.getItem('cart'))
    }
    this.removefromCart = this.removefromCart.bind(this)
  }

  componentDidMount() {
    this.props.getUser()
    if (this.props.user.id) {
      const userId = this.props.user.id
      this.props.getCartItems(userId)
    }
  }

  removefromCart(id) {
    // TODO: not sure why this is here -- Jae
    // if (this.props.loggedIn) {
    //   this.props.addItemToCart(this.props.product)
    // }

    // if not logged in, then
    if (!this.props.loggedIn) {
      const updatedCart = this.state.cart.filter(item => item.id !== id)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      this.setState({
        cart: updatedCart
      })
      // get from localStorage
      // splice it out
      // put back into localStorage
    }
  }

  render() {
    const cartToRender = !this.props.loggedIn
      ? this.state.cart || []
      : this.props.cart || []

    // // define the subtotal for guests
    // let subTotal
    // if (!this.props.loggedIn) {
    //   subTotal = this.state.cart
    //     .map((product) => product.count * product.price)
    //     .reduce((a, b) => a + b, 0)
    // }

    // // define subtotal for users

    // if (this.props.loggedIn) {
    //   subTotal = this.state.cart
    //     .map((product) => product.cartItem.quantity * product.cartItem.price)
    //     .reduce((a, b) => a + b, 0)
    //   console.log('logged in', subTotal)
    // }

    return (
      <div className="container">
        {cartToRender.map(product => {
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
                        <li className="list-item">Quantity: {product.count}</li>
                        <li className="list-item">{product.description}</li>
                        <li className="list-item">{product.lighting}</li>
                        <li className="list-item">{product.watering}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="dropdown">
                        <button
                          className="btn btn-primary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                        >
                          Update quantity
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a className="dropdown-item" href="#">
                            1
                          </a>{' '}
                          <a className="dropdown-item" href="#">
                            2
                          </a>
                          <a className="dropdown-item" href="#">
                            3
                          </a>
                          <a className="dropdown-item" href="#">
                            4
                          </a>
                          <a className="dropdown-item" href="#">
                            5
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                {/* <p>Subtotal: ${subTotal}</p> */}
              </div>
            </div>
            <div className="row">
              {cartToRender.length ? (
                <div className="col-md-12">
                  <button type="button" className="btn btn-success">
                    Proceed to checkout
                  </button>
                </div>
              ) : (
                'Your cart is empty'
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('in Cart mapState Redux state', state)
  return {
    cart: state.cart,
    loggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatchToCart = dispatch => {
  return {
    getCartItems: userId => dispatch(_setCartItems(userId)),
    getUser: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToCart)(Cart)
