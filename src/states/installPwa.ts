import { atom } from 'recoil'

export const installPwaState = atom<boolean>({
  key: 'installPwa',
  default: true,
})
