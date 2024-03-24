"use client"
import { ColorSchemeProvider, Container, Grid, MantineProvider } from '@mantine/core'
import { HeaderMiddle } from '@/components/Header/Header'
import { useLocalStorage } from '@mantine/hooks'
import Footer from '@/components/Footer/Footer'
import "@/app/globals.css"
import { useEffect, useState } from 'react'
import { supabase } from '@/utils'
import AdminProjectsCard from '@/components/Projects/AdminProjectsCard'
import AdminHeader from '@/components/Admin/Header'

export default function Home() {
    const [colorScheme, toggleColorScheme] = useLocalStorage<any>({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
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
                    <div id="home" style={{ overflow: "hidden" }}>
                        <div style={{
                            overflowX: "hidden",
                            overflowY: "hidden"
                        }}>
                            <AdminHeader />
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
                                                    <AdminProjectsCard key={s.id} data={s} allImages={s.allImages.images} projectDemo={"https://google.com/"} dateCreated={s.dateCreated} projectDescription={s.projectDescription} projectSource={"https://github.com"} projectTitle={s.projectTitle} />
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
