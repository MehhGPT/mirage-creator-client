'use client'

import Link from 'next/link'
import { Container } from '@/components/Container'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import ThemeToggle from './ToogleTheme'
import Logo from "@/images/Dark.svg";
import Image from 'next/image'

export function Header() {
  return (
    <header className="py-5 fixed w-[100svw] bg-[#000000aa] backdrop-blur-md z-10 top-0">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Home">
              <Image src={Logo} alt='Logo' className='h-10 w-auto' />
            </Link>
          </div>
          <div className='flex items-center justify-around w-max'>
            <div className='mr-[0.5rem] ml-[0.5rem]'>
              <ConnectButton />
            </div>
            <div className='mr-[0.5rem] ml-[0.5rem]'>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
