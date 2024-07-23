'use client'

import { useRouter } from 'next/navigation'
import { getToken, initToken } from '@/stores'

export default function Page() {
  initToken();
  const token = getToken();
  const { push } = useRouter()
  if (!token) {
    push('/login')
  }
  return (
    <div>Index</div>
  )
}
