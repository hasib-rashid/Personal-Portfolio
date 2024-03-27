import { supabase } from '@/utils';
import React from 'react'
import AdminHeader from '@/components/Admin/Header';
import { useRouter } from 'next/navigation';


const Dashboard = () => {
    const router = useRouter()
    supabase.auth.getSession().then((res) => {
        if (!res.data.session) {
            console.log("You're not logged in")
        }
    })

    return (
        <div>
            <AdminHeader />
            <button onClick={() => {
                supabase.auth.signOut()
                router.push('/')
            }}>Sign Out</button>

            <h1>Dashboard</h1>
        </div>
    )
}

export default Dashboard