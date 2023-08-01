'use client'

import { useRouter } from 'next/navigation'
import { Container } from '@/app/_components/Container'
import { Heading } from '@/app/_components/Heading'
import { LinkText } from '@/app/_components/LinkText'
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
    <Container>
      <Heading>体温を記録する</Heading>

      <div className="my-4">
        <LinkText href="/">HOME</LinkText>
      </div>

      <div className="my-4">
        <BodyTempFields onSave={handleSave} />
      </div>
    </Container>
  )
}
