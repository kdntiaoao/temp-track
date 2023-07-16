import { BodyTemp } from '@/hooks/useBodyTemp'
import { atom } from 'recoil'

export const bodyTempListState = atom<BodyTemp[] | null>({
  key: 'bodyTempList',
  default: null,
})
