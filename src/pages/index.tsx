import { hot } from 'react-hot-loader/root'
import React from 'react'
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './home'
import About from './about'

export default hot(function App() {
  return (
    <div style={{ padding: '8px' }}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </div>
  )
})
