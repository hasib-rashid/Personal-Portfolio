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
        <div style={{ overflow: "hidden" }}>
          <main style={{
            overflowX: "hidden"
          }}>
            <div className="hero-image" style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none"
            }}>
              <Image src={bg} alt="Hero" fill />
            </div>
            <div style={{
              position: "relative",
              zIndex: 10
            }}>
              <HeaderMiddle />
            </div>
            <HomePage />
          </main>
          <About />
          <Projects />
          <br />
          <ContactUs />
          <Footer />
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
