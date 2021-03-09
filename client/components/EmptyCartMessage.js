import React from 'react'

const EmptyCartMessage = (props) => {
  return (
    <div className="container container mt-5">
      <div className="d-flex justify-content-between">
        <h3 className="title">Your cart is currently empty.</h3>
      </div>
    </div>
  )
}

export default EmptyCartMessage
