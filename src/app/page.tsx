'use client'

import { LinkText } from './_components/LinkText'
import { Heading } from './_components/Heading'
import { Container } from './_components/Container'
import { Table } from './_components/Table'
import { useBodyTemp } from '@/hooks/useBodyTemp'

export default function Home() {
  const { isLoading } = useBodyTemp()

  return (
    <>
      <Container>
        <Heading>体温管理アプリ</Heading>

        {isLoading ? <p>Loading...</p> : <Table />}

        <ul className="my-4">
          <li>
            <LinkText href="/register">体温を記録する</LinkText>
          </li>
          <li>
            <LinkText href="/sample">サンプル</LinkText>
          </li>
          <li>
            <LinkText href="/sample2">サンプル2</LinkText>
          </li>
        </ul>
      </Container>
    </>
  )
}
