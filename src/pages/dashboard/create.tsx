import AdminHeader from '@/components/Admin/Header'
import { supabase } from '@/utils'
import { TextInput, Button, Alert } from '@mantine/core'
import React, { useState } from 'react'
import { notifications } from '@mantine/notifications';
import './style.css'

const create = () => {
    supabase.auth.getSession().then((res) => {
        if (!res.data.session) window.location.href = "/"
    })

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [source, setSource] = useState('');
    const [demo, setDemo] = useState('');
    const [images, setImages] = useState('');

    return (
        <div>
            <AdminHeader />
            <button onClick={() => {
                supabase.auth.signOut()
                window.location.href = '/'
            }}>Sign Out</button>

            <div className='inputContainers'>
                <br />
                <TextInput
                    label="Title"
                    placeholder="Title of the Post"
                    required
                    className="dashboardInput"
                    value={title}
                    onChange={(event) => setTitle(event.currentTarget.value)}
                    mt="md"
                />

                <TextInput
                    label="Description"
                    placeholder="Description of the Post"
                    required
                    className="dashboardInput"
                    value={description}
                    onChange={(event) => setDescription(event.currentTarget.value)}
                    mt="md"
                />

                <TextInput
                    label="Date Created"
                    placeholder="The Created Date of the Post"
                    required
                    className="dashboardInput"
                    value={dateCreated}
                    onChange={(event) => setDateCreated(event.currentTarget.value)}
                    mt="md"
                />

                <TextInput
                    label="Source"
                    placeholder="Source Code"
                    required
                    className="dashboardInput"
                    value={source}
                    onChange={(event) => setSource(event.currentTarget.value)}
                    mt="md"
                />

                <TextInput
                    label="Demo"
                    placeholder="Demo of the Project"
                    required
                    className="dashboardInput"
                    value={demo}
                    onChange={(event) => setDemo(event.currentTarget.value)}
                    mt="md"
                />

                <TextInput
                    label="Images"
                    placeholder="All Images in JSON"
                    required
                    className="dashboardInput"
                    value={images}
                    onChange={(event) => setImages(event.currentTarget.value)}
                    mt="md"
                />

                <br />

                <Button onClick={() => {
                    if (!title || !description || !dateCreated || !demo || !source || !images) {
                        alert("! Something is Missing")
                    } else {
                        alert("Success")
                    }
                }}>Post Project</Button>
            </div>
        </div>
    )
}

export default create