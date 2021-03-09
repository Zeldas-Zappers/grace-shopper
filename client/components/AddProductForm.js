import React from 'react'
import {connect} from 'react-redux'
import {addNewProduct} from '../store/products'

const initState = {
  name: '',
  price: '',
  description: '',
  imageUrl: '',
  category: '',
  lighting: '',
  watering: '',
  inventory: '',
  count: 0,
}

class AddProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = initState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.addProduct(this.state)
    this.setState(initState)
  }

  render() {
    return (
      <div className="container">
        <p>
          <button
            className="btn btn-lg home-button"
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Add Product
          </button>
        </p>
        <div className="collapse" id="collapseExample">
          <div className="card card-body">
            <div className="form-title">
              <h3>Add a new product below</h3>
            </div>
            <form className="main-form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Product Name:</label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  min="1"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={this.state.imageUrl}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="inventory">Inventory:</label>
                <input
                  type="number"
                  min="1"
                  name="inventory"
                  value={this.state.inventory}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="count">Count:</label>
                <input
                  type="number"
                  min="0"
                  name="count"
                  value={this.state.count}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input
                  type="text"
                  name="category"
                  value={this.state.category}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lighting">Lighting:</label>
                <input
                  type="text"
                  name="lighting"
                  value={this.state.lighting}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="watering">Watering:</label>
                <input
                  type="text"
                  name="watering"
                  value={this.state.watering}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-lg home-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => dispatch(addNewProduct(product)),
  }
}

export default connect(null, mapDispatchToProps)(AddProductForm)
