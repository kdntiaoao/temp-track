'use client'

import Link from 'next/link'
import { Button } from '../_components/Button'
import { Table } from '../_components/Table'
import { useBodyTemp } from '@/hooks/useBodyTemp'
import { useInstalledPwa } from '@/hooks/useInstalledPwa'
import { useNotificationPermission } from '@/hooks/useNotificationPermission'

export default function Home() {
  const { isLoading } = useBodyTemp()
  const { installedPwa, onInstallPwa } = useInstalledPwa()
  const { notificationPermission, requestNotificationPermission } = useNotificationPermission()

  return (
    <>
      {isLoading ? <p>Loading...</p> : <Table />}

      <div className="sticky bottom-4 grid gap-4 mt-8">
        <div>
          <Button component={Link} href="/register">
            体温を記録する
          </Button>
        </div>

        {notificationPermission === 'default' && (
          <div>
            <Button onClick={requestNotificationPermission}>PUSH通知を登録する</Button>
          </div>
        )}

        {!installedPwa && (
          <div>
            <Button onClick={onInstallPwa}>インストール</Button>
          </div>
        )}
      </div>
    </>
  )
}
