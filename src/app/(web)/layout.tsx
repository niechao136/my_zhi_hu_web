'use client'
import { Badge, Button, Dropdown, Input, InputProps, Menu, MenuProps, Modal, Popover, message } from 'antd'
import { BellFilled, UserOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getToken, initToken, menu$, setMenu, setOwner, startLoading, stopLoading } from '@/stores'
import React, { useEffect, useRef, useState } from 'react'
import { post } from '@/api'
import style from '@/styles/layout.module.css'

type MenuItem = Required<MenuProps>['items'][number]

const menu: MenuItem[] = [
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
  const [search, setSearch] = useState('')
  const [question, setQuestion] = useState({})
  const [open, setOpen] = useState(false)
  const flag = useRef(true)
  const { push } = useRouter()
  const onClick: MenuProps['onClick'] = (e) => {
    setMenu(e.key)
  }
  const onSearch: InputProps['onChange'] = (e) => {
    setSearch(e.target.value)
  }
  const addQuestion = () => {
    setQuestion({})
    setOpen(true)
  }
  const linkTo = () => {
    push('/people')
  }
  const logout = async () => {
    startLoading('logout')
    const res = await post({ url: 'auth/logout' })
    if (res?.data?.status === 200) {
      push('/login')
    }
    stopLoading('logout')
  }
  const userItems: MenuProps['items'] = [
    {
      key: 'people',
      label: (<a onClick={linkTo}>我的主页</a>)
    },
    {
      key: 'logout',
      label: (<a onClick={logout}>登出</a>)
    },
  ]
  const onChange = (key: keyof Question.Add) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setQuestion({
        ...question,
        [key]: e.target.value,
      })
    }
  }
  const submitAdd = async () => {
    startLoading('add')
    setOpen(false)
    const res = await post<Result.Msg<Question.Info>>({ url: 'question/add', data: question })
    if (res?.data?.status === 200) {
      message.success('新增问题成功')
    }
    stopLoading('add')
  }
  const content = (
    <div>

    </div>
  )
  useEffect(() => {
    if (flag.current) {
      flag.current = false
      return
    }
    menu$.subscribe((next) => {
      setCurrent(next)
    })
    startLoading('layout')
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
        setOwner(res?.data?.data ?? {})
        stopLoading('layout')
      })
    }
  }, [push])
  return (
    <div className={style.layout}>
      <header className={style.header}>
        <Link className={style.link} href={'/'}>Home</Link>
        <Menu onClick={onClick} selectedKeys={[current]} mode={'horizontal'} items={menu}/>
        <Input.Search className={style.search} value={search} placeholder={'请输入'} onChange={onSearch}/>
        <Button type={'primary'} onClick={addQuestion}>提问</Button>
        <div className={style.right}>
          <Badge>
            <Popover trigger={'click'} placement={'bottomRight'} content={content}>
              <Button icon={<BellFilled/>} type={'text'}/>
            </Popover>
          </Badge>
          <Dropdown menu={{ items: userItems }}>
            <Button icon={<UserOutlined/>} type={'text'}/>
          </Dropdown>
        </div>
        <Modal title={'新增问题'} open={open} centered={true} okText={'提交'} onOk={submitAdd} cancelText={'取消'} onCancel={() => setOpen(false)}>
          <div className={style.add}>
            <Input placeholder={'请输入标题'} onChange={onChange('title')}/>
            <Input.TextArea placeholder={'请输入描述'} rows={6} onChange={onChange('content')}/>
          </div>
        </Modal>
      </header>
      <div>{children}</div>
    </div>
  )
}
