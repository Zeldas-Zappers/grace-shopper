/* eslint-disable complexity */
/* eslint-disable no-warning-comments */
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {me} from '../store/user'
import logo from './lightseedslogo.png'
import UserHome from './user-home'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCollapsedMenu: false,
      cart: [],
      prevCart: [],
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  // componentDidMount() {
  //   //if logged in user
  //   // if(this.props.isLoggedIn) {

  //   // }

  //   //if guest
  //   if (!this.props.isLoggedIn) {
  //     if (localStorage.getItem('cart') === null) {
  //       this.setState({
  //         cart: [],
  //       })
  //     } else {
  //       this.setState({
  //         cart: JSON.parse(localStorage.getItem('cart')),
  //       })
  //     }
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   let test = JSON.parse(localStorage.getItem('cart')) //could be null

  //   console.log('STORAGE', test)
  //   console.log('CART ON StATE', this.state.cart)

  //   if (test && this.state.cart.length !== test.length) {
  //     this.setState({
  //       cart: test,
  //     })
  //   }
  // }
  // TODO: we will have to udpate this with componentDidMount and componentDidUpdate to get the cart counter to work properly. Will probably need to use logic similar to what is found in Cart.js. Also will have to use this.setState in componentDidUpdate in order for the counter to work for guests

  toggleMenu() {
    this.setState({
      showCollapsedMenu: !this.state.showCollapsedMenu,
    })
  }

  render() {
    const {adminStatus} = this.props.user || ''
    console.log('CART STATE', adminStatus)
    const show = this.state.showCollapsedMenu ? 'show' : ''
    const cart = !this.props.isLoggedIn
      ? JSON.parse(localStorage.getItem('cart')) || []
      : this.props.cart || []

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <a className="navbar-brand m-2" href="/">
              <img src={logo} />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={this.toggleMenu}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className={
                'collapse navbar-collapse justify-content-end m-0 ' + show
              }
              id="navbarNav"
            >
              {this.props.isLoggedIn ? (
                <div>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link
                        to="/"
                        className="nav-link active"
                        aria-current="page"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/products" className="nav-link">
                        All Products
                      </Link>
                    </li>
                    {adminStatus && (
                      <li className="nav-item">
                        <Link
                          to="/users"
                          className="nav-link"
                          tabIndex="-1"
                          aria-disabled="true"
                        >
                          All Users
                        </Link>
                      </li>
                    )}
                    <li className="nav-item">
                      <Link
                        to="/logout"
                        className="nav-link"
                        onClick={this.props.handleClick}
                      >
                        Logout
                      </Link>
                    </li>
                    {!adminStatus && (
                      <li className="nav-item">
                        <Link
                          to="/cart"
                          className="nav-link"
                          tabIndex="-1"
                          aria-disabled="true"
                        >
                          Cart
                        </Link>
                      </li>
                    )}
                  </ul>
                  <UserHome />
                </div>
              ) : (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-link active"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/products" className="nav-link">
                      All Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/cart"
                      className="nav-link"
                      tabIndex="-1"
                      aria-disabled="true"
                    >
                      Cart
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    cart: state.cart,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getUser: () => dispatch(me()),
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
