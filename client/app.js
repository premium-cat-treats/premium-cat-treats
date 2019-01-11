import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import Aux from './components/Aux'

const App = () => {
  return (
    <Aux>
      <Navbar />
      <Routes />
    </Aux>
  )
}

export default App
