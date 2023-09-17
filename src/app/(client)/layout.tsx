'use client'

import { startTransition, useEffect, useState } from 'react'
import { getFcmToken, onMessageByFCM } from '@/utils/firebase/firebase'
import { Message } from '../_components/Message'

type Message = {
  title?: string
  body: string
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<Message | null>(null)
  const [displayedMessage, setDisplayedMessage] = useState(false)

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

    getFcmToken()

    onMessageByFCM((notification) => {
      if (!notification?.body) {
        setMessage(null)
      } else {
        setMessage({
          title: notification.title,
          body: notification.body,
        })
        setDisplayedMessage(true)
      }
    })

    window.addEventListener('click', hideMessage)

    return () => {
      window.removeEventListener('click', hideMessage)
    }
  }, [])

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

      <Message displayed={displayedMessage && !!message}>
        <p className="overflow-hidden text-ellipsis">{message?.body}</p>
      </Message>
    </>
  )
}
