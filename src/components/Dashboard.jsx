import {Link, useNavigate} from 'react-router-dom'
import { supabase } from '../../supabaseClient';
import {useEffect, useState} from 'react'

const Dashboard = () => {
    const handleLogout = async () => {
        const {error} = await supabase.await.signOut()
    }
  return (
    <div>Dashboard

        <button>Logout</button>
    </div>
  )
}

export default Dashboard