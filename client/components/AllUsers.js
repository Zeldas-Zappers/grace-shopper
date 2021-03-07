import React from 'react'
import {connect} from 'react-redux'
import {setUsers} from '../store/users'

class AllUsers extends React.Component {
  componentDidMount() {
    console.log(this.props)
    this.props.getAllUsers()
  }

  render() {
    console.log('USERS', this.props)
    const {users} = this.props || []

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
        <div className="row">
          {users.map(user => {
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

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(setUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
