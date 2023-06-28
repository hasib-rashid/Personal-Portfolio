import React, { useEffect, useState } from 'react'
import ProjectsCard from './ProjectsCard'
import { Container, Grid, SimpleGrid } from "@mantine/core"
import { supabase } from '@/utils';

const Projects = () => {
    const [projectArray, setProjectArray] = useState<any>()

    useEffect(() => {
        async function def() {
            const data = await supabase.from("projects").select("*")

            const finalData: any = await data.data

            setProjectArray(finalData)
        }
        def()
    }, [])


    if (projectArray) {
        return (
            <div>
                <h1 style={{ margin: "0", padding: "70px 0", textAlign: "center" }}><span className='crimson'>P</span>rojects</h1>

                <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {
                        projectArray.length > 0 && (
                            <Grid grow>
                                {projectArray.map((s: any) => (
                                    <Grid.Col span={4}>
                                        <ProjectsCard allImages={s.allImages.images} projectDemo={"https://google.com/"} dateCreated={s.dateCreated} projectDescription={s.projectDescription} projectSource={"https://github.com"} projectTitle={s.projectTitle} />
                                    </Grid.Col>
                                ))}
                            </Grid>
                        )
                    }
                </Container>
            </div>
        )
    } else {
        return (
            <h1 style={{ textAlign: "center", fontFamily: "Lobster, cursive", fontSize: "40px", fontWeight: 300 }}>Loading</h1>
        )
    }
}

export default Projects