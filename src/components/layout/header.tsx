'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Twitter } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled ? 'backdrop-blur-md bg-white/80' : ''
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="HackerNews中文版"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="font-bold">HackerNews CN</span>
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/category/top" className="hover:text-gray-600">热门</Link>
              <Link href="/category/newest" className="hover:text-gray-600">最新</Link>
              <Link href="/category/best" className="hover:text-gray-600">最佳</Link>
              <Link href="/category/ask" className="hover:text-gray-600">问答</Link>
              <Link href="/category/show" className="hover:text-gray-600">展示</Link>
              <Link href="/category/jobs" className="hover:text-gray-600">工作</Link>
            </nav>
            <a
              href="https://twitter.com/viggozhang"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100/70 hover:bg-gray-100/90 transition-colors duration-200"
            >
              <Twitter className="w-4 h-4" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
} 