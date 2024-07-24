'use client'
import { useRouter } from 'next/navigation'
import { getToken, initToken, startLoading, stopLoading } from '@/stores'
import React, { useEffect } from 'react'
import { post } from '@/api'

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
  startLoading('layout')
  const { push } = useRouter()
  useEffect(() => {
    initToken();
    const token = getToken();
    if (!token) {
      push('/login')
      stopLoading('layout')
    } else {
      setTimeout(async () => {
        const res = await post<Result.Msg<User.Info>>({
          url: 'user/info',
        })
        console.log(res)
        stopLoading('layout')
      })
    }
  }, [push])
  return (
    <div>
      <div>Layout</div>
      <div>{children}</div>
    </div>
  )
}
