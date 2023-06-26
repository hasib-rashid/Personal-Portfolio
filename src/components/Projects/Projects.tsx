import React, { useEffect, useState } from 'react'
import ProjectsCard from './ProjectsCard'
import { Container, Grid, SimpleGrid } from "@mantine/core"
import { supabase } from '@/utils';

const Projects = () => {
    const images = [
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    ];

    const [projectArray, setProjectArray] = useState<any>()

    useEffect(() => {
        async function def() {
            const data = await supabase.from("projects").select("*")

            const jinish: any = await data.data

            setProjectArray(jinish)
        }
        def()
    }, [])


    if (projectArray) {
        console.log(projectArray[0].allImages.images)
        return (
            <div>
                <h1 style={{ margin: "50px 0", textAlign: "center" }}><span className='crimson'>P</span>rojects</h1>

                <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {
                        projectArray.length > 0 && (
                            <SimpleGrid cols={2}>
                                {projectArray.map((s: any) => (
                                    <ProjectsCard allImages={s.allImages.images} projectDemo={"https://google.com/"} dateCreated={s.dateCreated} projectDescription={s.projectDescription} projectSource={"https://github.com"} projectTitle={s.projectTitle} />
                                ))}
                            </SimpleGrid>
                        )
                    }
                </Container>
            </div>
        )
    } else {
        return (
            <h1>Loading</h1>
        )
    }
}

export default Projects