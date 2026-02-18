import { Route, Routes } from 'react-router'
import React from 'react';
import Homepage from "./pages/Homepage"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <div className="min-h-screen" data-theme="business">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  )
}

export default App