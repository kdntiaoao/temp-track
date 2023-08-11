'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './_components/Button'
import { Container } from './_components/Container'
import { Heading } from './_components/Heading'
import { Table } from './_components/Table'
import { useBodyTemp } from '@/hooks/useBodyTemp'

import logoImage from '@/assets/images/logo.png'

export default function Home() {
  const { isLoading } = useBodyTemp()

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/serviceworker.js')
    }
  }, [])

  return (
    <>
      <Container>
        <Heading>
          <Image src={logoImage} alt="" width={32} height={32} />
          TempTrack
        </Heading>

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
