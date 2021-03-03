import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Plant Store
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {isLoggedIn ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link" onClick={handleClick}>
                  Logout
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
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Shop
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

    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

////////
/*<nav>
      {isLoggedIn ? (
        <div>
          // {/* The navbar will show these links after you log in */ //}
//   <Link to="/home">Home</Link>
//   <Link to="/products">Shop</Link>
//   <Link to="/cart">Cart</Link>
//   <a href="#" onClick={handleClick}>
//     Logout
//   </a>
// </div>
// ) : (
//   <div>
//     {/* The navbar will show these links before you log in */}
//     <Link to="/login">Login</Link>
//     <Link to="/signup">Sign Up</Link>
//     <Link to="/products">Shop</Link>
//     <Link to="/cart">Cart</Link>

//     </div>
//   )}
// </nav>

//////
