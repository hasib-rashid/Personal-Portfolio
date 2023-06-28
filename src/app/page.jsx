"use client"
import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { HeaderMiddle } from '../components/Header/Header'
import bg from '../../public/your-image.jpg'
import Image from 'next/image'
import HomePage from '@/components/HomePage/HomePage'
import About from '@/components/About/About'
import { useLocalStorage } from '@mantine/hooks'
import Projects from '@/components/Projects/Projects'
import ContactUs from "@/components/ContactUs/ContactMe"
import Footer from '@/components/Footer/Footer'

export default function Home() {
  const [colorScheme, toggleColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <div id="home" style={{ overflow: "hidden" }}>
          <main style={{
            overflowX: "hidden"
          }}>
            <HeaderMiddle />
            <HomePage />
          </main>
          <div id="about">
            <About />
          </div>
          <div id="projects">
            <Projects />
          </div>
          <br />
          <div id="contact">
            <ContactUs />
          </div>
          <Footer />
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
