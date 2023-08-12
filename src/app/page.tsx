'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from './_components/Button'
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
      {isLoading ? <p>Loading...</p> : <Table />}

      <div className="my-8">
        <Button component={Link} href="/register">
          体温を記録する
        </Button>
      </div>
    </>
  )
}
