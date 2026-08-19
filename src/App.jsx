import React from 'react'
import Login from './components/auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
    <div className='min-h-screen text-white'>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/SignUp' element={<SignUp />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App