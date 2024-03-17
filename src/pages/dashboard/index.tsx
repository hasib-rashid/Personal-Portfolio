import { supabase } from '@/utils';
import React from 'react'
import AdminHeader from '@/components/Admin/Header';

const dashboard = () => {
    supabase.auth.getSession().then((res) => {
        if (!res.data.session) window.location.href = "/"
    })

    return (
        <div>
            <AdminHeader />
            <button onClick={() => {
                supabase.auth.signOut()
                window.location.href = '/'
            }}>Sign Out</button>

            <h1>Dashboard</h1>
        </div>
    )
}

export default dashboard