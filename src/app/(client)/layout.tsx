'use client'

import { useEffect } from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
    }
    console.log(navigator)

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) {
      console.log('standalone')
    } else {
      console.log('not standalone')
    }
  }, [])

  return <>{children}</>
}
