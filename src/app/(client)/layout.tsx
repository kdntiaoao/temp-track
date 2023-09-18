'use client'

import { startTransition, useEffect, useState } from 'react'
import { getFcmToken, onMessageByFCM } from '@/utils/firebase/firebase'
import { Message } from '../_components/Message'
import { useNotificationPermission } from '@/hooks/useNotificationPermission'

type Message = {
  title?: string
  body: string
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [currentToken, setCurrentToken] = useState('')
  const [message, setMessage] = useState<Message | null>(null)
  const [displayedMessage, setDisplayedMessage] = useState(false)
  const { notificationPermission } = useNotificationPermission()

  const hideMessage = () => {
    setDisplayedMessage(false)
  }

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) {
      console.log('standalone')
    } else {
      console.log('not standalone')
    }

    if (notificationPermission === 'granted') {
      getFcmToken().then((token) => {
        setCurrentToken(token || '')
      })

      onMessageByFCM((notification) => {
        if (!notification?.body) {
          setMessage(null)
        } else {
          setMessage({
            title: notification.title,
            body: notification.body,
          })
          startTransition(() => {
            setDisplayedMessage(true)
          })
        }
      })
    }

    window.addEventListener('click', hideMessage)

    return () => {
      window.removeEventListener('click', hideMessage)
    }
  }, [notificationPermission])

  useEffect(() => {
    if (displayedMessage) {
      setTimeout(() => {
        setDisplayedMessage(false)
      }, 10000)
    }
  }, [displayedMessage])

  return (
    <>
      {children}

      <p className="mt-8">{currentToken}</p>

      <Message displayed={displayedMessage && !!message}>
        <p className="overflow-hidden text-ellipsis">{message?.body}</p>
      </Message>
    </>
  )
}
