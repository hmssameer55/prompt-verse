import '@styles/globals.css'
import type { Metadata } from 'next'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata: Metadata = {
  title: 'Prompt Verse',
  description: 'Discover & Share AI-Powered Prompts',
}

export default function RootLayout({
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
