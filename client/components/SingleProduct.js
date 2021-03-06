import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'
import {_addItemToCart} from '../store/cart'
import {me} from '../store/user'

export class SingleProduct extends React.Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
    this.props.getUser()
  }

  addToCart() {
    //dispatch thunk if user (or loggedIn is true)
    if (this.props.loggedIn) {
      //this.props.addItemToCart(this.props.product)
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
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  render() {
    let product = this.props.product
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
              <div className="col-md-6" />
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
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    product: state.product,
    loggedIn: !!state.user.id,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (productId) => dispatch(fetchProduct(productId)),
    addItemToCart: (product) => dispatch(_addItemToCart(product)),
    getUser: () => dispatch(me()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
