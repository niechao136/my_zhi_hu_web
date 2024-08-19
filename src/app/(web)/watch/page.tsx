'use client'

import { useEffect, useRef } from 'react'
import { setMenu } from '@/stores'

export default function Watch() {
  const flag = useRef(true)
  useEffect(() => {
    if (flag.current && process.env.NEXT_PUBLIC_APP_ENV === 'development') {
      flag.current = false
      return
    }
    setMenu('watch')
  }, [])
  return (
    <div>Watch</div>
  )
}
