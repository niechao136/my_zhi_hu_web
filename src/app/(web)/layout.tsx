'use client'

import React from 'react'

export default function Page({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div>
      <div>Layout</div>
      <div>{children}</div>
    </div>
  )
}
