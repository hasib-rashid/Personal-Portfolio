import { supabase } from '@/utils';
import React, { useEffect, useState } from 'react'
import AdminHeader from '@/components/Admin/Header';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const router = useRouter()
    const [session, setSession] = useState<any>(null)

    useEffect(() => {

        setSession(supabase.auth.getSession())

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    if (!session) {
        return (
            <h1>404 Not Found</h1>
        )
    }
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