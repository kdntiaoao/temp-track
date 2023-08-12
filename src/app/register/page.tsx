'use client'

import { useRouter } from 'next/navigation'
import { useBodyTemp } from '@/hooks/useBodyTemp'
import { useCallback } from 'react'
import { BodyTempFields } from '../_components/BodyTempFields'

export default function Page() {
  const router = useRouter()
  const { registerBodyTemp } = useBodyTemp()

  const handleSave = useCallback<(time: number, bodyTemp: string) => void>(
    (time, bodyTemp) => {
      registerBodyTemp(time, bodyTemp)
      router.push('/')
    },
    [registerBodyTemp, router]
  )

  return (
    <div className="my-4">
      <BodyTempFields onSave={handleSave} />
    </div>
  )
}
