import React from 'react'
import {connect} from 'react-redux'
import {setUsers} from '../store/users'
import {me} from '../store/user'

class AllUsers extends React.Component {
  componentDidMount() {
    console.log('in component did mount', this.props)
    this.props.getAllUsers()
    this.props.getUser()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id) {
      this.props.getAllUsers()
    }
  }
  render() {
    console.log('in render ---------- this.props', this.props)
    if (this.props.users.length === 0) {
      return <div>No users to view!</div>
    }

    // console.log('USERS', this.props)
    const {users} = this.props || []
    return (
      <div className="container mt-4">
        <div className="row">
          {users.map((user) => {
            return (
              <div className="col-md-4 mb-4" key={user.id}>
                <div className="card">
                  <h5 className="card-header">
                    {user.firstName} {user.lastName}
                  </h5>
                  <div className="card-body">
                    <p className="card-text">E: {user.email}</p>
                    <p className="card-text">P: {user.phone}</p>
                    <p className="card-text">Address: {user.address}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(setUsers()),
    getUser: () => dispatch(me()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
