'use client'
import { Button, Checkbox, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

export default function Page() {
  return (
    <div className="login" style={{width: '100%', height: '100vh'}}>
      <div className="login-area">
        <Input
          prefix={<UserOutlined/>}
        />
        <Input.Password
          prefix={<LockOutlined/>}
        />
        <div className="login-help">
          <Checkbox
            title="记住密码"
          />
          <Button
            type="text"
            title="忘记密码"
          />
        </div>
        <Button
          title="登录"
        />
      </div>
    </div>
  )
}
