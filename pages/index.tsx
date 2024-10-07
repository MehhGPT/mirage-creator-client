"use client"

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import Landing from './landing'


export default function Home() {

  return (
    <>
      <Header />
      <main>
        <Landing />
      </main>
      <Footer />
    </>
  )
}