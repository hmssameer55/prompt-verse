import '@styles/globals.css'
import type { Metadata } from 'next'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import {getServerSession} from "next-auth/next"

export const metadata: Metadata = {
  title: 'Prompt Verse',
  description: 'Discover & Share AI-Powered Prompts',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
     <body>
      <Provider>
      <div className='main'>
        <div className='gradient'/>
      </div>
      <main className='app'>
        <Nav />
        {children}
      </main>
      </Provider>
     </body>
    </html>
  )
}
