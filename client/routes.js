import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'
import Home from './components/Home'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import AllUsers from './components/AllUsers'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    const adminStatus = this.props.adminStatus || ''

    return (
      // had to remove the Switch to get the welcome message to load correctly. Also had to change component={Home} to exact path -- JC
      // <Switch>
      // {/* Routes placed here are available to all visitors */}
      // <div>
      //   {isLoggedIn && (
      // <Switch>
      // {/* Routes placed here are only available after logging in */}
      // <Route path="/" component={UserHome} />
      // {/* </Switch> */}
      // )}
      <div>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:productId" component={SingleProduct} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/users" component={AllUsers} />
        <Route exact path="/" component={Home} />

        {/* Displays our Login component as a fallback */}
        {/* <Route component={Login} /> */}
        {/* // </Switch> */}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    adminStatus: state.user.adminStatus,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
