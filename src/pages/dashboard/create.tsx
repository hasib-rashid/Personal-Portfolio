import AdminHeader from '@/components/Admin/Header'
import { supabase } from '@/utils'
import { TextInput, Button } from '@mantine/core'
import { useState, useEffect } from 'react'
import './style.css'
import { useRouter } from 'next/navigation'


export default function Create() {
    const router = useRouter()
    const [session, setSession] = useState<any>(null)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [source, setSource] = useState('');
    const [demo, setDemo] = useState('');
    const [images, setImages] = useState('');

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
                        const img = JSON.parse(images)
                        const handleSubmit = async () => {
                            const { data, error } = await supabase
                                .from('projects')
                                .insert([
                                    { dateCreated: dateCreated, projectTitle: title, projectDescription: description, projectSource: source, projectDemo: demo, allImages: img }
                                ])
                                .select()
                            console.log(data)
                        }

                        handleSubmit()
                        alert("Success")
                        router.push("/projects")
                    }
                }}>Post Project</Button>
            </div>
        </div>
    )
}