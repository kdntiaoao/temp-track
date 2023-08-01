'use client'

import { useCallback } from 'react'
import { BodyTempFields } from '../BodyTempFields'
import { useBodyTemp } from '@/hooks/useBodyTemp'
import { modalStyle, wrapStyle } from './EditModal.css'

type Props = { edittedId: string; onClose: () => void }

export const EditModal = ({ edittedId, onClose }: Props) => {
  const { editBodyTemp } = useBodyTemp()

  const handleSave = useCallback<(time: number, bodyTemp: string) => void>(
    (time, bodyTemp) => {
      editBodyTemp(edittedId, time, bodyTemp)
      onClose()
    },
    [editBodyTemp, edittedId, onClose]
  )

  const stopPropagation = (ev: React.MouseEvent): void => {
    ev.stopPropagation()
  }

  return (
    <div className={wrapStyle} onClick={onClose}>
      <div className={modalStyle} onClick={stopPropagation}>
        <BodyTempFields onSave={handleSave} />
      </div>
    </div>
  )
}
