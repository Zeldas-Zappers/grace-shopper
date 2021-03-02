import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Home from './components/Home'

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      {/* <Routes /> */}
    </div>
  )
}

export default App
