import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <section
      style={{
        backgroundImage: `url("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/plants-in-pots-royalty-free-image-1574464255.jpg?crop=1.00xw:0.752xh;0,0.0649xh&resize=1200:*")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="d-flex align-items-center justify-content-center"
    >
      <div>
        <Link to="/products">
          <button className="btn btn-lg home-button">Shop Now!</button>
        </Link>
      </div>
    </section>
  )
}

export default Home
