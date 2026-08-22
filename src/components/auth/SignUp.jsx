import {Link} from 'react-router-dom'
import { supabase } from '../../supabaseClient';
import {useEffect, useState} from 'react'

const SignUp = () => {

  // save user typed text
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  // helper to track and show msgs to user
  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState('')

  // submission handling function

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const {data, error} = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          user_name: name,
        }
      }
    })

    setLoading(false)

    if (error) {
      setMessage(`${error.message}`)
    } else {
      setMessage ('Account created Sucessfully!')
    }
  }
  return (
    <>

    <div className="wrapper flex min-h-screen items-center justify-center bg-slate-900 p-4">


    <div className="container max-w-md p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
    
        <form className='flex flex-col gap-4' onSubmit={handleSignUp}>
          <h2 className='text-center text-xl font-bold text-white'>Create Account</h2>

            {message &&
            <div className='p-3 text-sm text-center rounded-lg bg-slate-800 text-white border border-slate-700'>{message}</div>
            }

            <label>Username</label>
            <input 
            value={name}
            className='w-full rounded-md border border-slate-700 bg-slate-900 p-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none' 
            type="text" 
            placeholder='Username'
            onChange={(e) => setName(e.target.value)}
            />


            <label>Email</label>
            <input 
            value={email}
            className='w-full rounded-md border border-slate-700 bg-slate-900 p-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none' 
            type="email" 
            placeholder='Email Address'
            onChange={(e) => setEmail(e.target.value)}
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
              Create Account
            </button>

            <p className='text-center text-sm text-late-400 mt-2'>
              Already have an account? {' '}
            <Link
            to='/'
            className='font-medium text-blue-400 hover:text-blue-300 hover:underline transition-all'
            >
            Login
            </Link>
            </p>
        </form>
    </div>
    </div>
    </>
  )
}

export default SignUp