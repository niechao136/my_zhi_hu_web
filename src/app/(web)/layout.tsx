'use client'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getToken, initToken, startLoading, stopLoading } from '@/stores'
import React, { useEffect, useState } from 'react'
import { post } from '@/api'

type MenuItem = Required<MenuProps>['items'][number]

const menu: MenuItem[] = [
  {
    label: (<Link href={'/my'}>我的</Link>),
    key: 'my'
  },
  {
    label: (<Link href={'/watch'}>关注</Link>),
    key: 'watch'
  },
  {
    label: (<Link href={'/'}>推荐</Link>),
    key: 'home'
  },
  {
    label: (<Link href={'/ranking'}>热榜</Link>),
    key: 'ranking'
  },
]

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
  startLoading('layout')
  const [current, setCurrent] = useState('home')
  const { push } = useRouter()
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }
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
  }, [])
  return (
    <div>
      <Menu onClick={onClick} selectedKeys={[current]} mode={'horizontal'} items={menu}/>
      <div>{children}</div>
    </div>
  )
}
