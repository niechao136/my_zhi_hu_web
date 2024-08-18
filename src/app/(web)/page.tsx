'use client'

import { useEffect, useRef } from 'react'
import { setMenu } from '@/stores'

export default function Home() {
  const flag = useRef(true)
  useEffect(() => {
    if (flag.current) {
      flag.current = false
      return
    }
    setMenu('home')
  }, [])
  return (
    <div>Index</div>
  )
}
