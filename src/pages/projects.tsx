"use client"
import { ColorSchemeProvider, Container, Grid, MantineProvider, Skeleton } from '@mantine/core'
import { HeaderMiddle } from '../components/Header/Header'
import HomePage from '@/components/HomePage/HomePage'
import About from '@/components/About/About'
import { useLocalStorage } from '@mantine/hooks'
import Projects from '@/components/Projects/Projects'
import ContactUs from "@/components/ContactUs/ContactMe"
import Footer from '@/components/Footer/Footer'
import "../app/globals.css"
import { useEffect, useState } from 'react'
import { supabase } from '@/utils'
import ProjectsCard from '@/components/Projects/ProjectsCard'

export default function Home() {
    const [colorScheme, toggleColorScheme] = useLocalStorage<any>({
        key: 'mantine-color-scheme',
        defaultValue: 'dark',
        getInitialValueInEffect: true,
    });
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
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                    <title>Projects | Hasib Al Rashid</title>
                    <link rel="icon" type="image/x-icon" href="https://i.ibb.co/64fzyj7/Untitled-design-1-removebg-preview.png"></link>
                    <meta property="og:image" content="https://ibb.co/37VB41p" />
                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:image" content="https://ibb.co/37VB41p" />
                    <meta name="description" content="Portfolio Website of Hasib Al Rashid | Get to know about his skills and projects" />
                    <meta name="keywords" content="Portfolio, Projects, Overview" />
                    <meta name="author" content="Hasib Al Rashid" />
                    <div id="home" style={{ overflow: "hidden" }}>
                        <div style={{
                            overflowX: "hidden",
                            overflowY: "hidden"
                        }}>
                            <HeaderMiddle />
                            <br />
                            <br />
                            <br />
                            <br />
                            <h1 style={{ textAlign: "center" }}>All Projects</h1>

                            <br />
                            <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {
                                    projectArray.reverse().length > 0 && (
                                        <Grid grow>
                                            {projectArray.map((s: any) => (
                                                <Grid.Col span={5} key={s.id}>
                                                    <ProjectsCard data={s} key={s.id} allImages={s.allImages.images} projectDemo={s.projectDemo} dateCreated={s.dateCreated} projectDescription={s.projectDescription} projectSource={s.projectSource} projectTitle={s.projectTitle} />
                                                </Grid.Col>
                                            ))}
                                        </Grid>
                                    )
                                }

                            </Container>
                        </div>
                        <br />
                        <br />
                        <Footer />
                    </div>
                </MantineProvider>
            </ColorSchemeProvider>
        )
    } else {
        return (
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                    <div id="home" style={{ overflow: "hidden" }}>
                        <div style={{
                            overflowX: "hidden",
                            overflowY: "hidden"
                        }}>
                            <HeaderMiddle />
                            <br />
                            <br />
                            <br />
                            <br />
                            <h1 style={{ textAlign: "center" }}>All Projects</h1>

                            <br />

                            <h1 style={{ textAlign: 'center', fontSize: "50px" }} className='brand'>Loading</h1>
                        </div>
                        <br />
                        <br />
                        <Footer />
                    </div>
                </MantineProvider>
            </ColorSchemeProvider>
        )
    }
}
