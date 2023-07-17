import { bodyTempListState } from '@/states/bodyTempList'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

export type BodyTemp = {
  id: string
  time: number
  bodyTemp: string
}

export const useBodyTemp = () => {
  const [bodyTempList, setBodyTempList] = useRecoilState(bodyTempListState)
  const [isLoading, setIsLoading] = useState(true)

  const registerBodyTemp = (bodyTemp: string) => {
    const time = Date.now()
    const data = {
      id: 'bodyTemp:' + time,
      time,
      bodyTemp,
    }
    const result = [...(bodyTempList || []), data]
    window.localStorage.setItem('bodyTempList', JSON.stringify(result))
    setBodyTempList(result)
  }

  const deleteBodyTemp = (id: string) => {
    const result = bodyTempList?.filter((bodyTemp) => bodyTemp.id !== id) || []
    window.localStorage.setItem('bodyTempList', JSON.stringify(result))
    setBodyTempList(result)
  }

  useEffect(() => {
    const iniBodyTempList = JSON.parse(window.localStorage.getItem('bodyTempList') ?? '[]') as BodyTemp[]
    setBodyTempList(iniBodyTempList)
  }, [setBodyTempList])

  useEffect(() => {
    if (!bodyTempList) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [bodyTempList])

  return { bodyTempList, isLoading, registerBodyTemp, deleteBodyTemp }
}
