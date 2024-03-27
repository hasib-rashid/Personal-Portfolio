import { supabase } from '@/utils';
import React, { useEffect } from 'react'
import AdminHeader from '@/components/Admin/Header';
import { useRouter } from 'next/navigation';


const Dashboard = () => {
    const router = useRouter()
    supabase.auth.getSession().then((res) => {
        if (!res.data.session) {
            return (
                <h1>404 Not found</h1>
            )
        } else {

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
    })
}

export default Dashboard