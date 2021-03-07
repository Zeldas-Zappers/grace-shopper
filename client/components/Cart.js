import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {_setCartItems, updateProductQuantity} from '../store/cart'
import {me} from '../store/user'

// const products = [
//   {
//     id: 1,
//     name: 'A lovely fern',
//     price: 448,
//     description:
//       'This fern will make it seem like life is worth living sometimes. You should buy it!',
//     lighting: 'This plant does well in bright light',
//     watering: 'This plant needs to be watered every 30 minutes or it will DIE!',
//     imageUrl:
//       'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-pet-friendly-bundle_variant_growpot_none_360x.jpg?v=1613171147',
//   },
//   {
//     id: 2,
//     name: 'A lonely pine cone',
//     price: 12,
//     description:
//       'This pine cone is the last of its species. Cuddle with it so it can feel less lonely!',
//     lighting: 'This plant does well in low light.',
//     watering: 'This plant needs more cuddles than water',
//     imageUrl:
//       'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_coffee-plant_variant_small_grant_mint_360x.jpg?v=1613663664',
//   },
// ]
class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
      checkout: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.getCartitems()
  }
  handleClick() {
    this.setState({checkout: true})
  }
  handleChange(evt) {
    this.setState({quantity: evt.target.value})
  }
  handleSubmit(evt) {
    evt.preventDefault()
    console.log('evt.target ->', this.evt.target)
    // let cart;
    // if (this.props.loggedIn) {
    //   cart = this.props.cart || []
    // } else {
    //   cart = JSON.parse(localStorage.getItem('cart')) || []
    // }
    // this.props.updateQuantity(cart.id, productId, this.state.quantity)
  }
  render() {
    //if user is not logged in then cart will equal what is currently in local storage, else cart will equal the user's cart in the database
    console.log('props from render ->', this.props)
    console.log('THIS.STATE ->', this.state)
    const cart = !this.props.loggedIn
      ? JSON.parse(localStorage.getItem('cart')) || []
      : this.props.cart || []
    const subTotal = cart
      .map((product) => product.count * product.price)
      .reduce((a, b) => a + b, 0)
    return (
      <div className="container">
        {cart.map((product) => {
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
                      <button type="button" className="btn btn-warning">
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
                      <form className="main-form" onSubmit={this.handleSubmit}>
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
