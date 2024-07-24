'use client'
import { Spin } from 'antd'
import { useState, useEffect } from 'react'
import { loading_array$ } from '@/stores'

export default function AppGlobal() {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    loading_array$.subscribe(next => {
      setTimeout(() => {
        setLoading(next.length > 0)
      })
    })
  }, [])
  return (
    <>
      <Spin fullscreen={true} spinning={loading} />
    </>
  )
}
