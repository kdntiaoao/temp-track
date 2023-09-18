import { installPwaState } from '@/states/installPwa'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

export const useInstalledPwa = () => {
  const [installedPwa, setInstalledPwa] = useRecoilState(installPwaState)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  const enableInAppInstallPrompt = useCallback(
    (ev: Event) => {
      console.log('not installed!')
      ev.preventDefault()
      setDeferredPrompt(ev)
      console.log(ev)
      setInstalledPwa(false)
    },
    [setInstalledPwa]
  )

  const disableInAppInstallPrompt = useCallback(() => {
    console.log('installed!')
    setDeferredPrompt(null)
    setInstalledPwa(true)
  }, [setInstalledPwa])

  const onInstallPwa = async () => {
    const result = await deferredPrompt.prompt()
    console.log(`Install prompt was: ${result.outcome}`)
    disableInAppInstallPrompt()
  }

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', enableInAppInstallPrompt)
    window.addEventListener('appinstalled', disableInAppInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', enableInAppInstallPrompt)
      window.removeEventListener('appinstalled', disableInAppInstallPrompt)
    }
  }, [disableInAppInstallPrompt, enableInAppInstallPrompt, setInstalledPwa])

  return { installedPwa, onInstallPwa }
}
