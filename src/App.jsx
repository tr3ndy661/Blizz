import React from 'react'
import Login from './components/auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
    <div className='min-h-screen text-white'>
      <Routes>
        <Route path='/' element={<Login />}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App