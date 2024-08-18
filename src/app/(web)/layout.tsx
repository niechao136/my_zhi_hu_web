'use client'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getToken, initToken, setOwner, startLoading, stopLoading } from '@/stores'
import React, { useEffect, useState, useRef } from 'react'
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
  const [current, setCurrent] = useState('home')
  const flag = useRef(true)
  const { push } = useRouter()
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }
  useEffect(() => {
    if (flag.current) {
      flag.current = false
      return
    }
    startLoading('layout')
    initToken();
    const token = getToken();
    console.log(token)
    if (!token) {
      push('/login')
      stopLoading('layout')
    } else {
      setTimeout(async () => {
        const res = await post<Result.Msg<User.Info>>({
          url: 'user/info',
        })
        setOwner(res?.data?.data ?? {})
        stopLoading('layout')
      })
    }
  }, [push])
  return (
    <div>
      <header>
        <Menu onClick={onClick} selectedKeys={[current]} mode={'horizontal'} items={menu}/>
      </header>
      <div>{children}</div>
    </div>
  )
}
