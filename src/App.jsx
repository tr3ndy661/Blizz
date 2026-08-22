import React from 'react'
import Login from './components/auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/Dashboard';
import AddMediaForm from './components/AddMediaForm';

const App = () => {
  return (
    <BrowserRouter>
    <div className='min-h-screen text-white'>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/SignUp' element={<SignUp />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        
        <Route path='/addmedia' element={<AddMediaForm />}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App