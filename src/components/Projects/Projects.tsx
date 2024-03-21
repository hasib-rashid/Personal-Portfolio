import React, { useEffect, useState } from 'react'
import ProjectsCard from './ProjectsCard'
import { Container, Grid } from "@mantine/core"
import { supabase } from '@/utils';
import { Button } from '@mantine/core';

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
        const result = projectArray.reverse().slice(0, 4)
        return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h1 style={{ margin: "0", padding: "70px 0", textAlign: "center" }}><span className='crimson'>P</span>rojects</h1>

                <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {
                        projectArray.length > 0 && (
                            <Grid grow>
                                {result.map((s: any) => (
                                    <Grid.Col span={4}>
                                        <ProjectsCard data={s} allImages={s.allImages.images} projectDemo={"https://google.com/"} dateCreated={s.dateCreated} projectDescription={s.projectDescription} projectSource={"https://github.com"} projectTitle={s.projectTitle} />
                                    </Grid.Col>
                                ))}
                            </Grid>
                        )
                    }

                </Container>
                <Button
                    variant="filled"
                    onClick={() => {
                        window.location.href = "/projects"
                    }}
                    style={{ marginTop: "25px", width: "70vw" }}
                >
                    See More
                </Button>
            </div>
        )
    } else {
        return (
            <div>
                <h1 style={{ textAlign: "center", fontFamily: "Lobster, cursive", fontSize: "40px", fontWeight: 300 }}>Loading</h1>
            </div>
        )
    }
}

export default Projects