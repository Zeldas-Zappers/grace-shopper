import React from 'react'
import {connect} from 'react-redux'

const Admin = (props) => {
  console.log(props)
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h3>Welcome, {props.email}</h3>
        </div>
      </div>
    </div>
  )
}

const mapState = (state) => {
  return {
    email: state.user.email,
  }
}

export default connect(mapState)(Admin)
