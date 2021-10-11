import { hot } from 'react-hot-loader/root'
import React from 'react'
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom'

const Home = () => <div>Home</div>

export default hot(function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
})
