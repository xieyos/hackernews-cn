import { Metadata } from 'next'

const title = 'HackerNews中文版'
const description = '实时翻译的HackerNews中文版 - 最新科技新闻和讨论'

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s - ${title}`,
  },
  description,
  keywords: [
    'HackerNews',
    '黑客新闻',
    '科技新闻',
    '中文',
    '翻译',
    '程序员',
    '开发者',
    '创业',
  ],
  authors: [
    {
      name: 'viggo',
      url: 'https://github.com/ViggoZ',
    },
  ],
  creator: 'viggo',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://hn.aimaker.dev',
    title,
    description,
    siteName: title,
    images: [
      {
        url: '/og.webp',
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og.webp'],
    creator: '@viggo',
  },
  icons: {
    icon: [
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      }
    ],
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/favicon/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/favicon/android-chrome-512x512.png',
      }
    ]
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://hn.aimaker.dev'),
} 