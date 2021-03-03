import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <section
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1530968464165-7a1861cbaf9f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      className="d-flex align-items-center justify-content-center"
    >
      <div>
        <Link to="/products">
          <button className="btn btn-primary">Shop Now!</button>
        </Link>
      </div>
    </section>
  )
}

export default Home
