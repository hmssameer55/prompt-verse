"use client"

import React from 'react'
import {SessionProvider} from 'next-auth/react'

interface Props {
  children: React.ReactNode
  session: any
}

export default function Provider({children,session}: Props) {
  return (
    <SessionProvider  session={session}>
      {children}
    </SessionProvider>
  )
}
