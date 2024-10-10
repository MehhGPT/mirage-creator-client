"use client"

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero, How, Start, Why } from '@/components/Sections'


export default function Home() {

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Why />
        <How />
        <Start />
      </main>
      <Footer />
    </>
  )
}