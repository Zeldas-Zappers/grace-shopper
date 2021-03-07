import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {_setCartItems, updateProductQuantity} from '../store/cart'
import {me} from '../store/user'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.removefromCart = this.removefromCart.bind(this)
    this.state = {
      cart: !this.props.loggedIn
        ? JSON.parse(localStorage.getItem('cart')) || []
        : this.props.cart || [],
      quantity: 1,
      checkout: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    const userId = this.props.user.id
    this.props.getCartItems(userId)
  }
  handleClick() {
    this.setState({checkout: true})
  }
  handleChange(evt) {
    this.setState({quantity: evt.target.value})
    console.log('change in quantity ->', this.state)
  }
  handleSubmit(evt, productId) {
    evt.preventDefault()
    if (this.props.loggedIn) {
      let cart = this.props.cart || []
      console.log('PROPS CART', this.props.cart)
      // this.props.updateQuantity(cart.id, productId, this.state.quantity)
    } else {
      const newCart = [...this.state.cart]
      const productToUpdate = newCart.find(
        (product) => product.id === productId
      )
      productToUpdate.count = this.state.quantity
      const idx = newCart.indexOf(productToUpdate)
      newCart.splice(idx, 1, productToUpdate)
      console.log('NEW CART ->', newCart)
      localStorage.setItem('cart', JSON.stringify(newCart))
      this.setState({cart: newCart})
    }
  }
  removefromCart(id) {
    if (this.props.loggedIn) {
      this.props.addItemToCart(this.props.product)
    }

    const cart = this.state.cart.filter((item) => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(cart))
    this.setState({
      cart: cart,
    })
  }

  render() {
    const subTotal = this.state.cart
      .map((product) => product.count * product.price)
      .reduce((a, b) => a + b, 0)
    console.log('props from render ->', this.props)
    console.log('THIS.STATE ->', this.state)
    return (
      <div className="container">
        {this.state.cart.map((product) => {
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
                      </form>
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
                <p>Subtotal: ${subTotal}</p>
              </div>
            </div>
            <div className="row">
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
            </div>
          </div>
        </div>
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
    getCartItems: () => dispatch(_setCartItems()),
    getUser: () => dispatch(me()),
    updateQuantity: (cartId, productId, updatedProduct) =>
      dispatch(updateProductQuantity(cartId, productId, updatedProduct)),
  }
}

export default connect(mapStateToProps, mapDispatchToCart)(Cart)
