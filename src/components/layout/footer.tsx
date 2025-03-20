'use client'

import { Twitter, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-8 bg-opacity-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com/decohack"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100/70 hover:bg-gray-100/90 transition-colors duration-200"
            >
              <Twitter className="w-4 h-4" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://github.com/ViggoZ/hackernews-cn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100/70 hover:bg-gray-100/90 transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
          <div className="flex flex-col items-center gap-2 text-center text-xs">
            <p>© 2024 HackerNews CN. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
} 