'use client'
import { Button, Checkbox, Input } from 'antd'
import type { CheckboxProps, InputProps } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from'react'
import { post } from '@/api'
import { setToken, startLoading, stopLoading } from '@/stores'
import style from '@/styles/login.module.css'
import { getLocal, setLocal, rmLocal, LOCAL, AES_KEY, aesDecrypt, aesEncrypt } from '@/utils'

type LoginForm = {
  username?: string,
  password?: string,
  remember?: boolean,
}

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const { push } = useRouter()
  const checkChange: CheckboxProps['onChange'] = (e) => {
    setRemember(e.target.checked)
  }
  const usernameChange: InputProps['onChange'] = (e) => {
    setUsername(e.target.value)
  }
  const passwordChange: InputProps['onChange'] = (e) => {
    setPassword(e.target.value)
  }
  const loginSubmit = async () => {
    startLoading('login')
    const res = await post({ url: '/auth/login', data: { username, password } })
    if (res?.data?.status === 200) {
      if (remember) {
        setLocal(LOCAL.REMEMBER, 'true')
        setLocal(LOCAL.LOGIN, aesEncrypt(JSON.stringify({ username, password }), AES_KEY.LOGIN))
      } else {
        rmLocal(LOCAL.REMEMBER)
        rmLocal(LOCAL.LOGIN)
      }
      setToken(res.data?.data ?? '')
      push('/')
    }
    stopLoading('login')
  }
  useEffect(() => {
    const remember = getLocal(LOCAL.REMEMBER)
    let login: LoginForm = {}
    if (remember === 'true') {
      const local = getLocal(LOCAL.LOGIN) ?? ''
      if (!!local) {
        try {
          login = JSON.parse(aesDecrypt(local, AES_KEY.LOGIN))
        } catch (e) {

        }
      }
    }
    setRemember(remember === 'true')
    setUsername(login?.username ?? '')
    setPassword(login?.password ?? '')
  }, [])
  return (
    <div className={style.login}>
      <div className={style.area}>
        <Input
          prefix={<UserOutlined/>}
          defaultValue={username}
          onChange={usernameChange}
          placeholder={'用户名: admin or user'}
        />
        <Input.Password
          prefix={<LockOutlined/>}
          defaultValue={password}
          onChange={passwordChange}
          placeholder={'密码: abc123'}
        />
        <div className={style.check}>
          <Checkbox
            defaultChecked={remember}
            onChange={checkChange}>
            记住密码
          </Checkbox>
          <Button
            type={'link'}>
            忘记密码
          </Button>
        </div>
        <Button
          type={'primary'}
          onClick={loginSubmit}>
          登录
        </Button>
      </div>
    </div>
  )
}
