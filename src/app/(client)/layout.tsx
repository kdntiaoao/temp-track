'use client'

import Script from 'next/script'
import { useEffect } from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
    }

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) {
      console.log('standalone')
    } else {
      console.log('not standalone')
    }

    console.log(navigator)
  }, [])

  return (
    <>
      <Script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer strategy="beforeInteractive" />
      <Script id="one-signal" strategy="beforeInteractive">
        {`
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      OneSignalDeferred.push(function(OneSignal) {
        OneSignal.init({
          appId: "00e9639b-fa8a-4e79-8087-e071b16f9183",
          safari_web_id: "web.onesignal.auto.028d9952-ba2c-477b-babc-6aee5c5ba0de",
          notifyButton: {
            enable: true,
          },
        });
      });
    `}
      </Script>

      {children}
    </>
  )
}
