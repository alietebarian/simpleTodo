import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './component/Home'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
