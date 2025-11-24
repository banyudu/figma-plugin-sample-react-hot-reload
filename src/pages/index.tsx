import React from 'react'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './home'
import About from './about'

export default function App() {
  return (
    <div style={{ padding: '8px' }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  )
}
