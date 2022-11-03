import React from 'react'
import { Home } from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="*" element={<Home/>} />
        </Routes>
    </>
  )
}

export default App
