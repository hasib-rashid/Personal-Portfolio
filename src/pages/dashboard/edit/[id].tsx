import AdminHeader from '@/components/Admin/Header'
import { supabase } from '@/utils'
import { TextInput, Button } from '@mantine/core'
import { useState, useEffect } from 'react'
import '../style.css'
import { useRouter, usePathname } from 'next/navigation'

const EditID = () => {
    const router = useRouter()
    const pathname = usePathname()

    console.log(pathname)
    useEffect(() => {
        supabase.auth.getSession().then((res) => {
            if (!res.data.session) router.push("/")
        })
    }, [])


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [source, setSource] = useState('');
    const [demo, setDemo] = useState('');
    const [images, setImages] = useState('');
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

                <Button color='teal' onClick={() => {
                    if (!title || !description || !dateCreated || !demo || !source || !images) {
                        alert("! Something is Missing")
                    } else {
                        const img = JSON.parse(images)
                        const handleSubmit = async () => {
                            const { data } = await supabase
                                .from('projects')
                                .update([
                                    { dateCreated: dateCreated, projectTitle: title, projectDescription: description, projectSource: source, projectDemo: demo, allImages: img }
                                ])
                                // @ts-ignore
                                .eq('id', "1")
                                .select()
                            console.log(data)
                        }

                        handleSubmit()
                        alert("Success")
                        router.push("/projects")
                    }
                }}>Update Project</Button>
            </div>
        </div>
    )
}

export default EditID