'use client'

import { useEffect, useRef } from 'react'
import { setMenu } from '@/stores'

export default function Watch() {
  const flag = useRef(true)
  useEffect(() => {
    if (flag.current) {
      flag.current = false
      return
    }
    setMenu('watch')
  }, [])
  return (
    <div>Watch</div>
  )
}
