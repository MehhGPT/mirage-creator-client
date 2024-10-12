"use client"

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { CreatePage, CreateStory, Hero, How, Start, Why } from '@/components/Sections'
import { Separator } from '@/components/ui/separator'
import { useAccount } from 'wagmi'


export default function Home() {

  const { isConnected } = useAccount();

  if (isConnected) {
    return (
      <div>
        <Header />
        <main>
          <Hero />
          <CreateStory />
          <div className='flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
            <Separator className='w-[70svw] bg-gray-900 dark:bg-gray-100' />
          </div>
          <CreatePage />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Why />
        <How />
        <Start />
      </main>
      <Footer />
    </div>
  )
}