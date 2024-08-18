'use client'

import { useEffect, useRef } from 'react'
import { setMenu } from '@/stores'

export default function My() {
  const flag = useRef(true)
  useEffect(() => {
    if (flag.current) {
      flag.current = false
      return
    }
    setMenu('')
  }, [])
  return (
    <div>My</div>
  )
}
