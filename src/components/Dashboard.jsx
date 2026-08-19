import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient';
import { useState, useEffect } from 'react'

const Dashboard = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  // We'll store the profile data here in Ticket 5
  const [profile, setProfile] = useState(null)

  const handleLogout = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    setLoading(false)
    if (error) {
      alert(`Log out failed: ${error.message}`)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      {/* Top Navigation */}
      <nav className="mb-8 flex items-center justify-between rounded-2xl bg-white/5 p-4 backdrop-blur-xl border border-white/10">
        <h1 className="text-xl font-bold tracking-wider text-blue-400">Blizz</h1>
        <button 
          onClick={handleLogout}
          disabled={loading}
          className='rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-600/80 hover:cursor-pointer'
        >
          {loading ? 'Logging out...' : 'Log out'}
        </button>
      </nav>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        
        {/* Left Column: Profile Card (Ticket 4) */}
        <div className="col-span-1 rounded-3xl bg-white/5 p-6 backdrop-blur-xl border border-white/10">
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Placeholder Avatar */}
            <div className="h-24 w-24 rounded-full bg-slate-800 border-2 border-blue-500"></div>
            
            <div>
              <h2 className="text-2xl font-bold">Username</h2>
              <p className="mt-2 text-sm text-slate-400">User bio is supposed to go here.</p>
            </div>
            
            <button className="mt-4 w-full rounded-md border border-slate-700 bg-slate-900 p-2 text-sm font-semibold text-white transition-all hover:border-blue-500 hover:cursor-pointer">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Right Column: Library / Stats (Future Sprints) */}
        <div className="col-span-1 md:col-span-2 rounded-3xl bg-white/5 p-6 backdrop-blur-xl border border-white/10">
          <h2 className="mb-4 text-xl font-bold">My Library</h2>
          <p className="text-slate-400">No series tracked yet.</p>
        </div>

      </div>
    </div>
  )
}

export default Dashboard