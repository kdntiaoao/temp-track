import { installPwaState } from '@/states/installPwa'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

export const useInstallPwa = () => {
  const [installed, setInstalled] = useRecoilState(installPwaState)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  const onInstallPwa = async () => {
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
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      console.log(e)
      setInstalled(false)
    })
  }, [setInstalled])

  return { installed, onInstallPwa }
}
