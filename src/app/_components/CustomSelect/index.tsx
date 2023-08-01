'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import {
  containerMdStyle,
  containerSmStyle,
  itemMdStyle,
  itemSmStyle,
  opacityVar,
  rotateXVar,
} from './CustomSelect.css'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Item = string

export type Size = 'sm' | 'md' | 'lg'

type Props = {
  list: Item[]
  selectedVal: string
  size?: Size
  onChange: (val: string) => void
}

const lengthPerRotation = 12
const distanceDegree = 360 / lengthPerRotation

export const CustomSelect = ({ list, selectedVal, size = 'md', onChange }: Props) => {
  const [addedDegree, setAddedDegree] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)
  const reqIDRef = useRef<number>(0) // cancelAnimationFrame() 用のID
  const speedRef = useRef<number>(0)
  const prevClientYRef = useRef<number | null>(null)
  const containerElRef = useRef<HTMLDivElement>(null)

  const containerStyle = useMemo<string>(() => {
    if (size === 'sm') {
      return containerSmStyle
    } else if (size === 'md') {
      return containerMdStyle
    }
    return ''
  }, [size])

  const itemStyle = useMemo<string>(() => {
    if (size === 'sm') {
      return itemSmStyle
    } else if (size === 'md') {
      return itemMdStyle
    }
    return ''
  }, [size])

  const makedList = useMemo<Item[]>(() => {
    if (list.length >= lengthPerRotation + 3) {
      return list
    }

    if (!list.length) {
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

  const getRotateX = useCallback<(index: number) => number>(
    (index: number): number => {
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
      }

      // 下向きを正にするため、 - をつける
      return -result
    },
    [addedDegree, maxDegree]
  )

  const getOpacity = useCallback<(index: number) => number>(
    (index) => {
      const rotateX = getRotateX(index)
      if (Math.abs(rotateX) > 90) {
        return 0
      }
      return (1 - Math.abs(rotateX) / 90) ** 2
    },
    [getRotateX]
  )

  const handleMouseDown = useCallback<() => void>(() => {
    setIsActive(true)
    speedRef.current = 0
    prevClientYRef.current = null
    window.document.body.style.overflowY = 'hidden'
    window.document.body.style.height = '100vh'
  }, [])

  const handleMouseMove = useCallback<(ev: MouseEvent) => void>(
    (ev) => {
      ev.preventDefault()

      if (!isActive) {
        return
      }

      if (prevClientYRef.current !== null) {
        const diff = ev.clientY - prevClientYRef.current
        speedRef.current += diff / 10
      }

      prevClientYRef.current = ev.clientY
    },
    [isActive]
  )

  const handleTouchMove = useCallback<(ev: TouchEvent) => void>(
    (ev) => {
      ev.preventDefault()

      if (!isActive) {
        return
      }

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
          if (!isActive && Math.abs(speedRef.current) < 0.5) {
            if (Math.abs(prev) % distanceDegree > distanceDegree / 2) {
              speedRef.current *= Math.sign(speedRef.current)
            } else {
              speedRef.current *= -Math.sign(speedRef.current)
            }
          }

          if (!isActive && Math.abs(speedRef.current) < 1.5 && Math.abs(prev % distanceDegree) < 0.5) {
            return prev - (prev % distanceDegree)
          }
          const result = (prev + speedRef.current) % maxDegree
          return result
        })

        speedRef.current = Math.abs(speedRef.current) > 0.6 ? speedRef.current * 0.95 : speedRef.current
      }
      reqIDRef.current = window.requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.cancelAnimationFrame(reqIDRef.current)
    }
  }, [isActive, maxDegree])

  useEffect(() => {
    if (!isActive && addedDegree % distanceDegree === 0) {
      const selected = makedList.at(-addedDegree / distanceDegree)
      if (selected) {
        onChange(selected)
      }
    }
  }, [addedDegree, isActive, makedList, onChange])

  useEffect(() => {
    const selectedIndex = list.indexOf(selectedVal)
    setAddedDegree(-selectedIndex * distanceDegree)

    const handleMouseUp = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, makedList])

  useEffect(() => {
    containerElRef.current?.addEventListener('mousemove', handleMouseMove, true)
    containerElRef.current?.addEventListener('touchmove', handleTouchMove, true)

    return () => {
      containerElRef.current?.removeEventListener('mousemove', handleMouseMove, true)
      containerElRef.current?.removeEventListener('touchmove', handleTouchMove, true)
    }
  }, [handleMouseMove, handleTouchMove])

  return (
    <div className={containerStyle} ref={containerElRef} onMouseDown={handleMouseDown} onTouchStart={handleMouseDown}>
      {makedList.map((item, index) => (
        <div
          key={index}
          className={itemStyle}
          style={assignInlineVars({ [opacityVar]: `${getOpacity(index)}`, [rotateXVar]: `${getRotateX(index)}deg` })}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
