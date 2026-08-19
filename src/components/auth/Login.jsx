import {Link, useNavigate} from 'react-router-dom'
import { supabase } from '../../supabaseClient'; 
import {useEffect, useState} from 'react'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const cleanEmail = email.trim()

    const {data, error} = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: password,
    })

    setLoading(false)

    if (error) {
      setMessage(`${error.message}`)
    }
    else {
      setMessage(`Sign in Successful!`)
      navigate('/Dashboard')
    }

  }
  return (
    <>

    <div className="wrapper flex min-h-screen items-center justify-center bg-slate-900 p-4">


    <div className="container max-w-md p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
    

        <form className='flex flex-col gap-4' action="" onSubmit={handleLogin}>
          <h2 className='text-center text-xl font-bold text-white'>Login</h2>

            {message &&

            <div className='p-3 text-sm text-center rounded-lg bg-slate-800 text-white border border-slate-700'>{message}</div>
            }
            
            <label>Email</label>
            <input 
            value={email}
            className='w-full rounded-md border border-slate-700 bg-slate-900 p-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none' 
            type="email" 
            placeholder='Email Address'
            onChange={(e)=> setEmail(e.target.value)}
            />

            <label>Password</label>
            <input 
            value={password}
            className='w-full rounded-md border border-slate-700 bg-slate-900 p-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none'
            type="password" 
            placeholder='Password'
            onChange={(e)=> setPassword(e.target.value)}
            />

            <button 
            type="submit"
            className='w-full rounded-md bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 transition-all duration-300 hover:cursor-pointer'
            disabled={loading}
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