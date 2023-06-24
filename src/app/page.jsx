"use client"
import { MantineProvider } from '@mantine/core'
import { HeaderMiddle } from '../components/Header/Header'
import bg from '../../public/your-image.jpg'
import Image from 'next/image'
import HomePage from '@/components/HomePage/HomePage'
import About from '@/components/About/About'

export default function Home() {
  return (
    <MantineProvider theme={{ colorScheme: `${window.localStorage.getItem("theme")}` }} withGlobalStyles withNormalizeCSS>
      <div style={{ overflowX: "hidden" }}>
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
      </div>

    </MantineProvider>
  )
}
