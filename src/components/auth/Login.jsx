import {Link} from 'react-router-dom'
import { supabase } from '@supabase/supabase-js'
import {useEffect, useState} from 'react'

const Login = () => {
  const supabase = createClient('https://ctyfcpiykeusrthgoszz.supabase.co', )
  return (
    <>

    <div className="wrapper flex min-h-screen items-center justify-center bg-slate-900 p-4">


    <div className="container p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
    
        <form className='flex flex-col gap-4' action="">
          <h2 className='text-center text-xl font-bold text-white'>Login</h2>

            <label>Email</label>
            <input 
            className='w-full rounded-md border border-slate-700 bg-slate-900 p-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none' 
            type="email" 
            placeholder='Email Address'
            />

            <label>Password</label>
            <input 
            className='w-full rounded-md border border-slate-700 bg-slate-900 p-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none'
            type="password" 
            placeholder='Password'
            />

            <button 
            type="submit"
            className='w-full rounded-md bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 transition-all duration-300 hover:cursor-pointer'
            >
              Login
            </button>

            <p className='text-center text-sm text-late-400 mt-2'>
              Don't have an account? {' '}
            <Link
            to='/SignUp'
            className='font-medium text-blue-400 hover:text-blue-300 hover:underline transition-all'
            >
            Sign up
            </Link>
            </p>
        </form>
    </div>
    </div>
    </>
  )
}

export default Login