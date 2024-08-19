'use client'

import { Card } from 'antd'
import Link from 'next/link'
import style from '@/styles/ranking.module.css'

interface IQuestion {
  info: Question.Info
}

export function Question({ info }: IQuestion) {
  return (
    <>
      <Card className={style.question} bordered={false}>
        <Link href={'/question/' + info.id}>{info.title}</Link>
        <p>{info.content}</p>
      </Card>
    </>
  )
}
