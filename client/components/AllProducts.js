import React from 'react'

const data = [
  {
    id: 1,
    name: 'Plant',
    description: 'Please buy this plant',
    price: 30,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-pet-friendly-bundle_variant_growpot_none_540x.jpg?v=1613171147'
  },
  {
    id: 2,
    name: 'Plant',
    description: 'Please buy this plant',
    price: 30,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-pet-friendly-bundle_variant_growpot_none_540x.jpg?v=1613171147'
  },
  {
    id: 3,
    name: 'Plant',
    description: 'Please buy this plant',
    price: 30,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-pet-friendly-bundle_variant_growpot_none_540x.jpg?v=1613171147'
  },
  {
    id: 4,
    name: 'Plant',
    description: 'Please buy this plant',
    price: 30,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-pet-friendly-bundle_variant_growpot_none_540x.jpg?v=1613171147'
  },
  {
    id: 5,
    name: 'Plant',
    description: 'Please buy this plant',
    price: 30,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-pet-friendly-bundle_variant_growpot_none_540x.jpg?v=1613171147'
  },
  {
    id: 6,
    name: 'Plant',
    description: 'Please buy this plant',
    price: 30,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-pet-friendly-bundle_variant_growpot_none_540x.jpg?v=1613171147'
  },
  {
    id: 7,
    name: 'Plant',
    description: 'Please buy this plant',
    price: 30,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-pet-friendly-bundle_variant_growpot_none_540x.jpg?v=1613171147'
  },
  {
    id: 8,
    name: 'Plant',
    description: 'Please buy this plant',
    price: 30,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-pet-friendly-bundle_variant_growpot_none_540x.jpg?v=1613171147'
  }
]

class AllProducts extends React.Component {
  render() {
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
          {data.map(plant => {
            return (
              <div key={plant.id} className="col-lg-3 col-md-6 col-sm-12 mb-4">
                <div className="card">
                  <img src={plant.imageUrl} className="card-img-top" />
                  <div className="card-body row ">
                    <h5 className="card-text col-8">{plant.name}</h5>
                    <p className="card-text col-4 text-right">${plant.price}</p>
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

export default AllProducts
