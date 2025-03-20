import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Twitter } from 'lucide-react';
import ScrollDetector from './components/ScrollDetector';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HackerNews 中文版',
  description: '自动翻译的HackerNews中文内容',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={`${inter.className} min-h-screen flex flex-col group/body`}>
        <ScrollDetector />
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200 backdrop-blur-md bg-white/0 supports-[backdrop-filter]:bg-white/0 group-[.scrolled]/body:bg-white/80">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              HackerNews CN
            </Link>
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/decohack"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100/70 hover:bg-gray-100/90 transition-colors duration-200"
              >
                <Twitter className="w-4 h-4" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {children}
          <footer className="py-8 bg-opacity-0">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-6 text-sm text-gray-600">
              <a
                href="https://x.com/decohack"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100/70 hover:bg-gray-100/90 transition-colors duration-200"
              >
                <Twitter className="w-4 h-4" />
                <span className="sr-only">Twitter</span>
              </a>
              <div className="flex flex-col items-center gap-2 text-center text-xs">
                <p>Last Update: {new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</p>
                <p>© 2025 HackerNews CN. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
        </main>

        
      </body>
    </html>
  );
}
