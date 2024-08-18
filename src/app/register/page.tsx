'use client'
import { Button, Input, Modal } from 'antd'
import type { InputProps } from 'antd'
import { useState } from'react'
import { post } from '@/api'
import style from '@/styles/register.module.css'
import { md5Encrypt } from '@/utils'
import { startLoading, stopLoading } from '@/stores'

export default function Register() {
  const [form, setForm] = useState<User.Register>({})
  const onChange = (key: keyof User.Register) => {
    const event: InputProps['onChange'] = (e) => {
      setForm({
        ...form,
        [key]: e.target.value
      })
    }
    return event
  }
  const registerSubmit = async () => {
    startLoading('register')
    const res = await post({
      url: 'user/register',
      data: {
        username: form?.username ?? '',
        password: md5Encrypt(form?.password ?? ''),
        nickname: form?.nickname ?? '',
        phone: form?.phone ?? '',
        email: form?.email ?? '',
        role: 2,
      }
    })
    if (res?.data?.status === 200) {
      Modal.success({
        title: '注册成功',
        content: '用户已成功注册',
        okText: '回到登录页',
        cancelText: '取消',
        onOk() {
          location.href = '/login'
        }
      })
    }
    stopLoading('register')
  }
  return (
    <div className={style.register}>
      <div className={style.area}>
        <Input
          value={form.username}
          onChange={onChange('username')}
          placeholder={'用户名'}
        />
        <Input.Password
          value={form.password}
          onChange={onChange('password')}
          placeholder={'密码'}
        />
        <Input
          value={form.nickname}
          onChange={onChange('nickname')}
          placeholder={'昵称'}
        />
        <Input
          value={form.phone}
          onChange={onChange('phone')}
          placeholder={'电话号码'}
        />
        <Input
          value={form.email}
          onChange={onChange('email')}
          placeholder={'电子邮箱'}
        />
        <Button
          type={'primary'}
          onClick={registerSubmit}>
          注册
        </Button>
      </div>
    </div>
  )
}
