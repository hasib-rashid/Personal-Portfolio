import { supabase } from '@/utils';
import React, { useEffect } from 'react'

const dashboard = () => {
    supabase.auth.getSession().then((res) => {
        if (!res.data.session) window.location.href = "/"
    })

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => {
                supabase.auth.signOut()
                window.location.href = '/'
            }}>Sign Out</button>
        </div>
    )
}

export default dashboard