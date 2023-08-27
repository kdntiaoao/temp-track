'use client'

import Script from 'next/script'
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

    // Initializing the OneSignal SDK
    // https://onesignal.com/blog/how-to-integrate-onesignal-into-a-next-app/
    window.OneSignal = window.OneSignal || []
    const appId = 'b40b7cc7-13dc-4662-8b48-efa668f9b72a' // production
    // const appId = 'edc80000-6aca-4a61-a7eb-227d8026f625' // dev
    const safari_web_id = 'web.onesignal.auto.028d9952-ba2c-477b-babc-6aee5c5ba0de' // production
    // const safari_web_id = 'web.onesignal.auto.44fa898b-ecac-43e4-a4f9-b7817452e5d5' // dev
    window.OneSignal.push(function (OneSignal: any) {
      OneSignal.init({
        appId,
        safari_web_id,
        notifyButton: {
          enable: true,
        },

        allowLocalhostAsSecureOrigin: true,
      })
    })
    console.log('OneSignal', window.OneSignal)

    return () => {
      window.OneSignal = undefined
    }
  }, [])

  return (
    <>
      <Script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer strategy="beforeInteractive" />

      {children}
    </>
  )
}
