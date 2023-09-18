import { atom } from 'recoil'

export const notificationPermissionState = atom<NotificationPermission>({
  key: 'notificationPermission',
  default: 'default',
})
