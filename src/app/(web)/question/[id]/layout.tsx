import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "问题",
  description: "Generated by create next app",
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
    </>
  )
}
