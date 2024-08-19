'use client'

import { useEffect, useRef } from 'react'
import { setMenu } from '@/stores'

interface IQuestion {
  params: {
    id: number
  }
}

export default function Question({ params }: IQuestion) {
  const flag = useRef(true)
  useEffect(() => {
    if (flag.current && process.env.NEXT_PUBLIC_APP_ENV === 'development') {
      flag.current = false
      return
    }
    setMenu('')
  }, [])
  return (
    <>
      <p>Question: {params.id}</p>
    </>
  )
}

