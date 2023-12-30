import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from "./providers";
import NextTopLoader from 'nextjs-toploader';
import Search from '@/components/search/Search'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aniplay',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='dark text-foreground bg-background'>
      <head>
      <script src="https://kit.fontawesome.com/c189d5d7c5.js" crossorigin="anonymous"></script>
      </head>
      <body className={inter.className}>
        <Providers>
        <NextTopLoader color="#CA1313" className="z-[99999]"/>
        <Search/>
          {children}
        </Providers>
      </body>
    </html>
  )
}
