import { supabase } from '../supabaseClient';
import {useState} from 'react'

const AddMediaForm = ({onClose, fetchLibrary}) => {

    const [title, setTitle] = useState('')

    const [mediaType, setMediaType] = useState('anime')
    const [status, setStatus] = useState('watching')

    const [progress, setProgress] = useState(0)
    const [rating, setRating] = useState(0)

    const [isSubmitting, setIsSubmitting] = useState(false)


    //   handeling the mediaForm
    const addMediaForm = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
        const {data: {user}} = await supabase.auth.getUser()

        if (!user) {
            alert ('Login to add media')
        return
        }

        const newEntry = {
            user_id : user.id,
            title : title,
            media_type: mediaType,
            status: status,
            progress: parseInt(progress) || 0,
            rating: parseInt (rating) || 0
        }
        const {error} = await supabase.from('library').insert([newEntry])

        if (error) throw error

        fetchLibrary()
        onClose()

        
    } catch (error) {
        alert(`Error adding media: ${error.message}`)
    } finally {
        setIsSubmitting(false)
    }

    }


  return (
    <>

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

    <div className='w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl'>

    
    <button onClick={onClose} className="text-slate-400 transition-colors hover:text-white hover:cursor-pointer">✕</button>


    <form 
    className="flex flex-col gap-4"
    onSubmit={addMediaForm}
    >
        <h2 className='text-xl font-bold text-center text-white'>
            Add to Library
        </h2>
        {/* title */}
        <div className="flex flex-col">

            <label className="mb-1 text-sm text-slate-300">
                Title
            </label>

            <input 
            type='text'
            placeholder='e.g Kimetsu No Yaiba'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full rounded-md border border-slate-700 bg-slate-900 p-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none'
            />
        </div>

        <div className="grid grid-cols-2 gap-4">

            {/* media type */}
            <div className="flex flex-col">
            <label className='mb-1 text-sm text-slate-300'>Media Type</label>

            <select 
            className='w-full rounded-md border border-slate-700 bg-slate-900 p-3 text-white focus:border-blue-500 focus:outline-none'
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
            >
                <option value="anime">Anime</option>
                <option value="manga">Manga</option>
            </select>
            </div>

            {/* status */}
            <div className='flex flex-col'>
            <label className='mb-1 text-sm text-slate-300'> Status </label>
            
            <select
            className='w-full rounded-md border border-slate-700 bg-slate-900 p-3 text-white focus:border-blue-500 focus:outline-none'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            >
              <option value="watching">Watching</option>
              <option value="reading">Reading</option>
              <option value="completed">Completed</option>
              <option value="plan_to_watch">Plan to Watch</option>
              <option value="dropped">Dropped</option>
            </select>
            
            </div>
        </div>

        {/* progress input */}
        <div className="grid grid-cols-2 gap-4">

            <div className="flex flex-col">
            
            <label
            className='mb-1 text-sm text-slate-300'
            >
                Progress
            </label> 

            <input 
            type="number" 
            min='0'
            placeholder='0'
            className='w-full rounded-md border border-slate-700 bg-slate-900 p-3 text-white focus:border-slate-500 focus:outline-none'
            value={progress}
            onChange={(e) => {setProgress(e.target.value)}}
            />
            </div>

            {/* rating */}
            <div className="flex flex-col">
            <label className='mb-1 text-sm text-slate-300'> Rating (1-10)</label>
            <input 
            type="number" 
            min='1'
            max='10'
            placeholder='-'
            className="w-full rounded-md border border-slate-700 bg-slate-900 p-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            value={rating}
            onChange={(e) => setRating (e.target.value)}
            />
            </div>
        </div>

        <button
        type='submit'
        className="mt-4 w-full rounded-md bg-blue-600 p-3 font-semibold text-white transition-all duration-300 hover:cursor-pointer hover:bg-blue-700"        >
            {isSubmitting ? 'Saving...' : 'Add to Library'}
        </button>
    </form>
        </div>
    </div>
    
    </>
  )
}

export default AddMediaForm