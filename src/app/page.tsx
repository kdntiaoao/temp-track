'use client'

import { LinkText } from './_components/LinkText'
import { Heading } from './_components/Heading'
import { Container } from './_components/Container'
import { Table } from './_components/Table'
import { useBodyTemp } from '@/hooks/useBodyTemp'
import { useEffect } from 'react'
import { Button } from './_components/Button'

export default function Home() {
  const { bodyTempList, isLoading, registerBodyTemp } = useBodyTemp()

  const handleSave = () => {
    registerBodyTemp(
      '36.1 ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ'
    )
  }

  return (
    <Container>
      <Heading>体温管理アプリ</Heading>

      <div className="my-4">
        <Button onClick={handleSave}>保存</Button>
      </div>

      {isLoading ? <p>Loading...</p> : <Table />}

      <ul className="my-4">
        <li>
          <LinkText href="/register">体温を記録する</LinkText>
        </li>
      </ul>
    </Container>
  )
}
