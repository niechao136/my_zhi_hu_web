'use client'

import { useEffect, useRef, useState } from 'react'
import { setMenu, startLoading, stopLoading } from '@/stores'
import { post } from '@/api'
import { Question } from '@/components/Question'
import style from '@/styles/ranking.module.css'

export default function Ranking() {
  const flag = useRef(true)
  const [ranking, setRanking] = useState<Question.Info[]>([])
  useEffect(() => {
    if (flag.current) {
      flag.current = false
      return
    }
    startLoading('ranking')
    setMenu('ranking')
    setTimeout(async () => {
      const res = await post<Result.Page<Question.Info>>({ url: 'question/list' })
      if (res?.data?.status === 200) {
        setRanking(res?.data?.data ?? [])
      }
      stopLoading('ranking')
    })
  }, [])
  return (
    <div className={style.ranking}>
      {ranking.map(info => <Question info={info} key={info.id}/>)}
    </div>
  )
}
