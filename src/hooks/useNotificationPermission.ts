import { notificationPermissionState } from '@/states/notificationPermission'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

export const useNotificationPermission = () => {
  const [notificationPermission, setNotificationPermission] = useRecoilState(notificationPermissionState)

  const requestNotificationPermission = () => {
    try {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.')
        } else {
          console.log('Unable to get permission to notify.')
        }
        setNotificationPermission(permission)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setNotificationPermission(Notification.permission)
  }, [setNotificationPermission])

  return { notificationPermission, requestNotificationPermission }
}
