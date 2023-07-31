'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import { containerStyle, itemStyle, rotateXVar } from './CustomSelect.css'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Item = string | number

type Props = {
  list: Item[]
}

const lengthPerRotation = 12
const distanceDegree = 360 / lengthPerRotation

export const CustomSelect = ({ list }: Props) => {
  const [addedDegree, setAddedDegree] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)
  const reqIDRef = useRef<number>(0) // cancelAnimationFrame() 用のID
  const speedRef = useRef<number>(0)
  const prevClientYRef = useRef<number | null>(null)

  const makedList = useMemo<Item[]>(() => {
    if (list.length >= lengthPerRotation + 3) {
      return list
    }
    const num = Math.trunc((lengthPerRotation + 3) / list.length) + 1
    return Array(list.length * num)
      .fill(null)
      .map((_, i) => {
        return list[i % list.length]
      })
  }, [list])

  const maxDegree = useMemo<number>(() => makedList.length * distanceDegree, [makedList.length])

  const getRotateX = useCallback<(index: number) => string>(
    (index: number): string => {
      // const degree =
      //   index < makedList.length / 2 ? index * distanceDegree : (makedList.length - index) * -distanceDegree
      const degree = index * distanceDegree
      let result = degree + addedDegree
      if (Math.abs(result) > maxDegree) {
        result %= maxDegree
      }
      if (Math.abs(result) > maxDegree / 2) {
        result = Math.sign(result) * (Math.abs(result) - maxDegree)
      }
      if (Math.abs(result) >= 90) {
        result = 90
      } else {
        // console.log({ index, degree, result })
      }

      // if (index === 0) {
      //   console.log({ result })
      // }

      // 下向きを正にするため、 - をつける
      return `${-result}deg`
    },
    [addedDegree, maxDegree]
  )

  const handleMouseDown = useCallback<() => void>(() => {
    setIsActive(true)
    speedRef.current = 0
    prevClientYRef.current = null
    window.document.body.style.overflowY = 'hidden'
    window.document.body.style.height = '100vh'
  }, [])

  const handleMouseMove = useCallback<(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void>(
    (ev) => {
      if (!isActive) {
        return
      }
      ev.stopPropagation()
      if (prevClientYRef.current !== null) {
        const diff = ev.clientY - prevClientYRef.current
        speedRef.current += diff / 10
      }
      prevClientYRef.current = ev.clientY
    },
    [isActive]
  )

  const handleTouchMove = useCallback<(ev: React.TouchEvent<HTMLDivElement>) => void>(
    (ev) => {
      if (!isActive) {
        return
      }
      ev.stopPropagation()
      if (prevClientYRef.current !== null) {
        const diff = ev.touches[0].clientY - prevClientYRef.current
        speedRef.current += diff / 10
      }
      prevClientYRef.current = ev.touches[0].clientY
    },
    [isActive]
  )

  useEffect(() => {
    const animate = () => {
      if (speedRef.current) {
        window.cancelAnimationFrame(reqIDRef.current)
        setAddedDegree((prev: number): number => {
          // const result = (prev - 1) % maxDegree
          let result = (prev + speedRef.current) % maxDegree
          // console.log({ addedDegree: result, speed: speedRef.current })
          return result
        })
        speedRef.current = Math.abs(speedRef.current) > 0.001 ? speedRef.current * 0.9 : 0
      }
      reqIDRef.current = window.requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.cancelAnimationFrame(reqIDRef.current)
    }
  }, [maxDegree])

  useEffect(() => {
    const handleMouseUp = () => {
      console.log('inactive!!')
      setIsActive(false)
      window.document.body.style.overflowY = ''
      window.document.body.style.height = ''
    }
    window.addEventListener('mouseup', handleMouseUp, true)
    window.addEventListener('touchend', handleMouseUp, true)
    return () => {
      window.removeEventListener('mouseup', handleMouseUp, true)
      window.removeEventListener('touchend', handleMouseUp, true)
    }
  }, [])

  return (
    <div
      className={containerStyle}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {makedList.map((item, index) => (
        <div
          key={index}
          className={`${itemStyle} ${index === 0 ? 'text-red-700' : ''}`}
          style={assignInlineVars({ [rotateXVar]: getRotateX(index) })}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
