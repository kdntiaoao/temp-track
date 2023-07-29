'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import { containerStyle, itemStyle, transformVar } from './CustomSelect.css'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  list: (string | number)[]
}

const radius = 160

const lengthPerRotation = 12

export const CustomSelect = ({ list }: Props) => {
  const [addedDegree, setAddedDegree] = useState<number>(0)
  const reqRef = useRef<number>(0)

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

  const getTransform = useCallback(
    (index: number): string => {
      const degree = index * (360 / lengthPerRotation)
      let rotateX = degree - addedDegree
      if (rotateX >= 360) {
        rotateX -= maxDegree
      }
      if (rotateX <= -360) {
        rotateX += maxDegree
      }
      if (Math.abs(rotateX) > 90) {
        rotateX = -90
      }
      return `rotateX(${-rotateX}deg) translateZ(${radius}px)`
    },
    [addedDegree, maxDegree]
  )

  useEffect(() => {
    const addDegree = (timestamp: number) => {
      setAddedDegree((degree) => {
        let result = degree + 1
        if (result > maxDegree) {
          // window.cancelAnimationFrame(reqRef.current)
          result -= maxDegree
        }
        return result
      })
      reqRef.current = window.requestAnimationFrame(addDegree)
    }
    addDegree(1)
    return () => {
      window.cancelAnimationFrame(reqRef.current)
    }
  }, [maxDegree])

  return (
    <div className={containerStyle}>
      {makedList.map((item, index) => (
        <div key={index} className={itemStyle} style={assignInlineVars({ [transformVar]: getTransform(index) })}>
          {item}
        </div>
      ))}
    </div>
  )
}
