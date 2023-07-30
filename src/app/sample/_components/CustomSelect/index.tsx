'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import { containerStyle, itemStyle, rotateXVar } from './CustomSelect.css'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  list: (string | number)[]
}

const lengthPerRotation = 12

export const CustomSelect = ({ list }: Props) => {
  const [addedDegree, setAddedDegree] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)
  const speedRef = useRef<number>(0)
  const reqRef = useRef<number>(0)
  const prevClientYRef = useRef<number | null>(null)

  const makedList = useMemo<(string | number)[]>(() => {
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

  const maxDegree = makedList.length * (360 / lengthPerRotation)

  const getRotateX = useCallback(
    (index: number): string => {
      const degree =
        index < makedList.length / 2
          ? index * (360 / lengthPerRotation)
          : (makedList.length - index) * (-360 / lengthPerRotation)
      let rotateX = degree - addedDegree
      if (Math.abs(rotateX) >= 360) {
        rotateX %= maxDegree + 360
        // console.log({ beforeRotateX: rotateX })
        if (rotateX > 0) {
          rotateX -= maxDegree
        } else if (rotateX < 0) {
          rotateX += maxDegree
        }
        // console.log({ afterRotateX: rotateX })
      }
      if (Math.abs(rotateX) > 90) {
        rotateX = -90
      }
      // if (index === makedList.length - 1) {
      // console.log({ index, degree, addedDegree, maxDegree, rotateX })
      // }
      return `${-rotateX}deg`
    },
    [addedDegree, makedList, maxDegree]
  )

  const handleMouseDown = useCallback(() => {
    setIsActive(true)
    speedRef.current = 0
    prevClientYRef.current = null
    window.document.body.style.overflowY = 'hidden'
    window.document.body.style.height = '100vh'
  }, [])

  const handleMouseMove = useCallback(
    (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isActive) {
        return
      }
      if (prevClientYRef.current !== null) {
        const diff = ev.clientY - prevClientYRef.current
        speedRef.current -= diff / 10
      }
      prevClientYRef.current = ev.clientY
    },
    [isActive]
  )

  const handleTouchMove = useCallback(
    (ev: React.TouchEvent<HTMLDivElement>) => {
      if (!isActive) {
        return
      }
      if (prevClientYRef.current !== null) {
        const diff = ev.touches[0].clientY - prevClientYRef.current
        speedRef.current -= diff / 10
      }
      prevClientYRef.current = ev.touches[0].clientY
    },
    [isActive]
  )

  useEffect(() => {
    const addDegree = (timestamp: number) => {
      setAddedDegree((degree) => {
        const result = (degree + speedRef.current) % maxDegree
        return result
      })
      speedRef.current = Math.abs(speedRef.current * 0.9) > 0.01 ? speedRef.current * 0.9 : 0
      reqRef.current = window.requestAnimationFrame(addDegree)
    }
    addDegree(1)
    return () => {
      window.cancelAnimationFrame(reqRef.current)
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
