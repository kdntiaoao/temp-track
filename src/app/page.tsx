'use client'

import { Heading } from './_components/Heading'
import { Container } from './_components/Container'
import { Table } from './_components/Table'
import { useBodyTemp } from '@/hooks/useBodyTemp'
import { Button } from './_components/Button'
import Link from 'next/link'

export default function Home() {
  const { isLoading } = useBodyTemp()

  return (
    <>
      <Container>
        <Heading>体温管理アプリ</Heading>

        {isLoading ? <p>Loading...</p> : <Table />}

        <div className="my-4">
          <Button component={Link} href="/register">
            体温を記録する
          </Button>
        </div>
      </Container>
    </>
  )
}
