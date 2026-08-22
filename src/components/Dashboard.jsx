import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient';
import { useState, useEffect, use } from 'react'
import AddMediaForm from './AddMediaForm';

const Dashboard = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  const [profile, setProfile] = useState(null)
  const [fetchingProfile, setFetchingProfile] = useState(true)


//   use states for the bio
  const [editing, setIsEditing] = useState (false)
  const [editUsername, setEditUsername] = useState('')
  const [editBio, setEditBio] = useState('')

//   handeling the display of the AddForm

  const [showAddForm, setShowAddForm] = useState(false)

//   usestates for library
  const [library,setLibrary] = useState ([])

  const [uploading, setUploading] = useState(false)


  const uploadAvatar = async () => {
    try {
        setUploading(true)

        const file = event.target.files[0]
        if (!file) return

const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)
      
      const newAvatarUrl = data.publicUrl

      const { data: { user } } = await supabase.auth.getUser()
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: newAvatarUrl })
        .eq('id', user.id)

      if (updateError) throw updateError

    setProfile({ ...profile, avatar_url: newAvatarUrl })

    } catch (error) {
      alert(`Error uploading avatar: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  const fetchLibrary = async () => {
  const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return
    }

    const {data, error} = await supabase
    .from('library')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', {ascending: false})

    if (!error && data) {
        setLibrary(data)
    }
}
  useEffect (() => {
      fetchLibrary()
    }, [])

//   handeling profile update
  const updateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
        const { data: { user } } = await supabase.auth.getUser()

        const updates = {
            id: user.id,
            username: editUsername,
            bio: editBio,
        }

        const {error} = await supabase.from('profiles').upsert(updates)

        if (error) {
            alert(error.message)
        }
        else {
            setProfile(updates)
              setIsEditing(false)
        } 
    }catch (error) {
        alert ('data not update an error occured!')
    } finally {
        setLoading (false)
  }
  }

    useEffect (() => {
        const getProfile = async () => {
            try {
                setFetchingProfile(true)
                const {data: {user}, error: authError} = await supabase.auth.getUser()

                if (authError || !user) {
                    console.log ('No authenticated user found')
                    navigate('/')
                    return
                } 
                
                const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()

                if (error) {
                    throw error  
                }

                setProfile(data)
            } catch (error){
                console.log(`Eror getting profile from database: ${error.message}`)
            } finally {
                setFetchingProfile (false)
            }
        }
        getProfile()
    }, [navigate])





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

      <nav className="mb-8 flex items-center justify-between rounded-xs bg-white/5 p-4 backdrop-blur-xl border border-white/10">
        <h1 className="text-xl font-bold tracking-wider text-blue-400">Blizz</h1>
        <button 
          onClick={handleLogout}
          disabled={loading}
          className='rounded-xs bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-600/80 hover:cursor-pointer'
        >
          {loading ? 'Logging out...' : 'Log out'}
        </button>
      </nav>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        
        <div className="col-span-1 rounded-xs bg-white/5 p-6 backdrop-blur-xl border border-white/10">
          <div className="flex flex-col items-center gap-4 text-center">

        <div className="flex flex-col items-center gap-2">
        {profile?.avatar_url ? (
            <img 
            src={profile.avatar_url} 
            alt="Avatar" 
            className="h-24 w-24 rounded-full border-2 border-blue-500 object-cover shadow-lg shadow-blue-500/20"
            />
        ) : (
            <div className="h-24 w-24 rounded-full bg-slate-800 border-2 border-blue-500"></div>
        )}
        
        <label className="cursor-pointer text-xs font-semibold text-blue-400 transition-colors hover:text-blue-300">
            {uploading ? 'Uploading...' : 'Upload Image'}
            {/* The actual file input is hidden by Tailwind, but clicking the label triggers it! */}
            <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={uploadAvatar}
            disabled={uploading}
            />
        </label>
        </div>            
            <div>
              <h2 className="text-2xl font-bold">{profile?.username}</h2>
              <p className="mt-2 text-sm text-slate-400">{fetchingProfile ? 'Loading...' : profile?.bio || 'User bio is supposed to go here.'}</p>
            </div>

            { editing ? (
            <form onSubmit={updateProfile} className="flex w-full flex-col gap-3 text-left">
                <label className="text-sm text-slate-400">Username</label>
                <input 
                type="text" 
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                className="rounded-md border border-slate-700 bg-slate-900 p-2 text-white focus:border-blue-500 focus:outline-none"
                />
                
                <label className="text-sm text-slate-400">Bio</label>
                <textarea 
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="rounded-md border border-slate-700 bg-slate-900 p-2 text-white focus:border-blue-500 focus:outline-none"
                />
                
                <div className="flex gap-2">
                <button 
                    type="submit" 
                    disabled={loading}
                    className="mt-2 w-full rounded-md bg-blue-600 p-2 text-sm font-semibold text-white transition-all hover:bg-blue-700"
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
                <button 
                    type="button" 
                    onClick={() => setIsEditing(false)}
                    className="mt-2 w-full rounded-md border border-slate-700 bg-transparent p-2 text-sm font-semibold text-white transition-all hover:bg-slate-800"
                >
                    Cancel
                </button>
                </div>
            </form>
            ) : (
            <button 
                className="mt-4 w-full rounded-xs border border-slate-700 bg-slate-900 p-2 text-sm font-semibold text-white transition-all hover:border-blue-500 hover:cursor-pointer"
                onClick={() => {
                // Pre-fill the form with the current data before opening it
                setEditUsername(profile?.username || '')
                setEditBio(profile?.bio || '')
                setIsEditing(true)
                }}
            >
                Edit Profile
            </button>
            )}


          </div>
        </div>

        <div className="col-span-1 md:col-span-2 rounded-xs bg-white/5 p-6 backdrop-blur-xl border border-white/10">
          <h2 className="mb-4 text-xl font-bold">My Library</h2>


        <div className="flex flex-col gap-3">
        {library.length === 0 ? (
            <p className="text-slate-400">No series tracked yet.</p>
        ) : (
            library.map((item) => (
            <div 
                key={item.id} 
                className="flex items-center justify-between rounded-xl bg-slate-900/50 p-4 border border-slate-800"
            >
                <div>
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 uppercase tracking-wider">
                    {item.media_type} • {item.status}
                </p>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                <div className="flex flex-col items-end">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-semibold text-blue-400">{item.progress}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-slate-500">Rating</span>
                    <span className="font-semibold text-yellow-500">{item.rating}/10</span>
                </div>
                </div>
            </div>
            ))
        )}
        </div>

          <br />
        <button
        className='rounded-xs bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500 hover:cursor-pointer flex '
        onClick={() => {
            setShowAddForm(true)
        }}
        >Add New +</button>
        {showAddForm && (
            <AddMediaForm onClose={() => setShowAddForm(false)} fetchLibrary={fetchLibrary}/>
        )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard