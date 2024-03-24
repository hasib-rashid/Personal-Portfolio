"use client"
import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { HeaderMiddle } from '../components/Header/Header'
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
        <title>Hasib Al Rashid</title>
        <link rel="icon" type="image/x-icon" href="https://i.ibb.co/64fzyj7/Untitled-design-1-removebg-preview.png"></link>
        <meta property="og:image" content="https://ibb.co/37VB41p" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://ibb.co/37VB41p" />
        <meta name="description" content="Portfolio Website of Hasib Al Rashid | Get to know about his skills and projects" />
        <meta name="keywords" content="Portfolio, Projects, Overview" />
        <meta name="author" content="Hasib Al Rashid" />
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
