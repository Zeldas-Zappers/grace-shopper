import React from 'react'
import {fetchProducts} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {products} = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="dropdown mb-4">
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
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="col-lg-3 col-md-6 col-sm-12 mb-4"
              >
                <Link to={`/products/${product.id}`}>
                  <div className="card">
                    <img src={product.imageUrl} className="card-img-top" />
                    <div className="card-body row ">
                      <h5 className="card-text col-8">{product.name}</h5>
                      <p className="card-text col-4 text-right">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </Link>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
