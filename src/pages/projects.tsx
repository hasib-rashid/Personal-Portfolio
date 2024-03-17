"use client"
import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { HeaderMiddle } from '../components/Header/Header'
import HomePage from '@/components/HomePage/HomePage'
import About from '@/components/About/About'
import { useLocalStorage } from '@mantine/hooks'
import Projects from '@/components/Projects/Projects'
import ContactUs from "@/components/ContactUs/ContactMe"
import Footer from '@/components/Footer/Footer'
import "../app/globals.css"

export default function Home() {
    const [colorScheme, toggleColorScheme] = useLocalStorage<any>({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    });
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                <div id="home" style={{ overflow: "hidden" }}>
                    <div style={{
                        overflowX: "hidden",
                        margin: "25px"
                    }}>
                        <HeaderMiddle />
                        <br />
                        <br />
                        <h1>All Projects</h1>
                    </div>

                    <Footer />
                </div>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}
