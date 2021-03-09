import React from 'react'
import {fetchProducts} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AddProductForm from './AddProductForm'
import {removeProduct} from '../store/products'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  addToCart(productId) {
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
    const products = this.props.products || []
    const product = products.find((p) => p.id === productId)
    if (!this.props.loggedIn && !!product) {
      if (localStorage.getItem('cart') === null) {
        cart = [this.props.product]
      } else {
        cart = JSON.parse(localStorage.getItem('cart'))
        let existingCartItem = cart.find((product) => product.id === productId)

        if (existingCartItem) {
          existingCartItem.count++
        } else {
          cart.push(product)
        }
      }
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }

  render() {
    const products = this.props.products || []
    const adminStatus = this.props.adminStatus || ''

    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="dropdown mb-4 mt-4">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
              >
                Action
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item disabled" href="#">
                  Action
                </a>{' '}
                <a className="dropdown-item" href="#">
                  Another action
                </a>{' '}
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div>
          </div>
        </div>
        {adminStatus && (
          <div className="row mb-4">
            <AddProductForm />
          </div>
        )}
        <div className="row">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="col-lg-3 col-md-6 col-sm-12 mb-4"
              >
                <div className="card">
                  <Link to={`/products/${product.id}`}>
                    <img src={product.imageUrl} className="card-img-top" />
                    <div className="card-body row ">
                      <h5 className="card-text col-8">{product.name}</h5>
                      <p className="card-text col-4 text-right">
                        ${product.price}
                      </p>
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={(event) => {
                            event.stopPropagation()
                            this.addToCart(product.id)
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </Link>
                  {adminStatus && (
                    <button
                      onClick={() => this.props.deleteProduct(product)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#">
                    Previous
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    4
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    5
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    user: state.user,
    adminStatus: state.user.adminStatus,
  }
}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    deleteProduct: (product) => dispatch(removeProduct(product, history)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
