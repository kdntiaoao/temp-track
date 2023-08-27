'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '../_components/Button'
import { Table } from '../_components/Table'
import { useBodyTemp } from '@/hooks/useBodyTemp'

export default function Home() {
  const { isLoading } = useBodyTemp()
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [notInstalled, setNotInstalled] = useState<boolean>(false)

  const handleClickInstallButton = async () => {
    deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice

    setDeferredPrompt(null)

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt.')
    } else if (outcome === 'dismissed') {
      console.log('User dismissed the install prompt')
    }
  }

  useEffect(() => {
    if ('setAppBadge' in navigator) {
      let unreadCount = 125
      navigator.setAppBadge(unreadCount)
      console.log('setAppBadge', unreadCount)
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      console.log(e)
      setNotInstalled(true)
    })
  }, [])

  return (
    <>
      {isLoading ? <p>Loading...</p> : <Table />}

      <div className="my-8">
        <Button component={Link} href="/register">
          体温を記録する
        </Button>
      </div>

      {notInstalled && (
        <div className="my-8">
          <Button onClick={handleClickInstallButton}>インストール</Button>
        </div>
      )}
    </>
  )
}
