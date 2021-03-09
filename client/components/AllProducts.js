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

  render() {
    const {products} = this.props || []
    const adminStatus = this.props.adminStatus || ''

    return (
      <div className="container mt-4">
        {adminStatus && (
          <div className="row mb-4">
            <AddProductForm />
          </div>
        )}
        <div className="row mt-2">
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
                    </div>
                  </Link>
                  {adminStatus && (
                    <button
                      onClick={() => this.props.deleteProduct(product)}
                      className="btn home-button"
                    >
                      Delete
                    </button>
                  )}
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
