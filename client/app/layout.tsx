
import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

import localFont from 'next/font/local'
const myFont = localFont({
  src: [
    {
      path: './font/GT-America-Standard-Medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './font/GT-America-Standard-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './font/GT-America-Mono-Regular.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './font/DrukText-Medium.otf',
      weight: '900',
      style: 'normal',
    },
  ],
})


//const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TINA',
  description: 'Tina is an investment tool that aggregates and analyzes financial headlines to deliver sentiment insights.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={myFont.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
          
        </body>
    </html>
  )
}
