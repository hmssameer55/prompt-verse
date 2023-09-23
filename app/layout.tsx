import '@styles/globals.css'
import type { Metadata } from 'next'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import {getServerSession} from "next-auth/next"
import { Options } from '@app/api/auth/[...nextauth]/route'

export const metadata: Metadata = {
  title: 'Prompt Verse',
  description: 'Discover & Share AI-Powered Prompts',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(Options)

  return (
    <html lang="en">
     <body>
      <Provider session={session}>
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
