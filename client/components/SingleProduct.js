import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'

export class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
  }
  render() {
    let product = this.props.product
    console.log(product)
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <img src={product.imageUrl} />
          </div>
          <div className="col-md-7">
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
              <div className="col-md-6"></div>
              <div className="col-md-6">
                <button type="button" className="btn btn-success">
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (productId) => dispatch(fetchProduct(productId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
