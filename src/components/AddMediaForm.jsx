import React from 'react'

const AddMediaForm = () => {
  return (
    <>

    <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
    
    <form 
    className="flex flex-col gap-4"
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
            />
        </div>
    </form>
    </div>
    
    </>
  )
}

export default AddMediaForm