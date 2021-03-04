import React from 'react'

const products = [
  {
    id: 1,
    name: 'A lovely fern',
    price: 448,
    description:
      'This fern will make it seem like life is worth living sometimes. You should buy it!',
    lighting: 'This plant does well in bright light',
    watering: 'This plant needs to be watered every 30 minutes or it will DIE!',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-pet-friendly-bundle_variant_growpot_none_360x.jpg?v=1613171147',
  },
  {
    id: 2,
    name: 'A lonely pine cone',
    price: 12,
    description:
      'This pine cone is the last of its species. Cuddle with it so it can feel less lonely!',
    lighting: 'This plant does well in low light.',
    watering: 'This plant needs more cuddles than water',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_coffee-plant_variant_small_grant_mint_360x.jpg?v=1613663664',
  },
]
class Cart extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        {products.map((product) => {
          return (
            <div key={product.id}>
              <div className="row">
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-12">
                      <img alt="whatever alt we want" src={product.imageUrl} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button type="button" className="btn btn-warning">
                        Remove from cart
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-12">
                      <ul>
                        <li className="list-item">{product.name}</li>
                        <li className="list-item">${product.price}</li>
                        <li className="list-item">{product.description}</li>
                        <li className="list-item">{product.lighting}</li>
                        <li className="list-item">{product.watering}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="dropdown">
                        <button
                          className="btn btn-primary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                        >
                          Update quantity
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a className="dropdown-item" href="#">
                            1
                          </a>{' '}
                          <a className="dropdown-item" href="#">
                            2
                          </a>
                          <a className="dropdown-item" href="#">
                            3
                          </a>
                          <a className="dropdown-item" href="#">
                            4
                          </a>
                          <a className="dropdown-item" href="#">
                            5
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <p>Subtotal: $ insert subtotal here</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <button type="button" className="btn btn-success">
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Cart