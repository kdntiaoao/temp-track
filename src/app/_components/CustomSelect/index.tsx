'use state'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import { itemStyle, listStyle, opacityVar, rotateXVar, wrapStyle } from './CustomSelect.css'
import { useEffect, useState } from 'react'

type Props = {
  list: (string | number)[]
  selectedVal: string | number
  onChange: (val: string | number) => void
}

const DEGREE_DISTANCE = 10
let requestId = 0

export const CustomSelect = ({ list, selectedVal, onChange }: Props) => {
  const [isPointerDown, setIsPointerDown] = useState(false)
  const [startingY, setStartingY] = useState(0)
  const [difference, setDifference] = useState(0)
  const [speed, setSpeed] = useState(0)

  const handlePointerDown = (ev: React.MouseEvent<HTMLElement>) => {
    window.cancelAnimationFrame(requestId)
    setIsPointerDown(true)
    setStartingY(ev.clientY)
    setSpeed(0)
  }

  const stopScroll = (ev: React.MouseEvent<HTMLElement>) => {
    setIsPointerDown(false)
    animateStopScroll()
  }

  const animateStopScroll = () => {
    window.cancelAnimationFrame(requestId)

    let isStop = false
    setSpeed((speed) => {
      // 0に近くなったら0にする
      const result = Math.trunc(speed * 0.8 * 1000) / 1000
      if (result === 0) {
        isStop = true
      }
      return result
    })

    if (isStop) {
      return
    }

    requestId = window.requestAnimationFrame(animateStopScroll)
  }

  const handlePointerMove = (ev: React.MouseEvent<HTMLElement>) => {
    if (!isPointerDown) return

    const delta = (ev.clientY - startingY) / 1000
    setSpeed((speed) => speed + delta)
  }

  const getRoteX = (index: number) => {
    const degree = index * DEGREE_DISTANCE + difference
    return -degree + 'deg'
  }

  const getOpacity = (index: number) => {
    const absDegree = Math.abs(index * DEGREE_DISTANCE + difference)
    if (absDegree > 90) {
      return '0'
    }
    return '1'
  }

  const getNear = (difference: number) => {
    // ちょうどよいdifference
    const checkingDifferenceList = Array(list.length)
      .fill(0)
      .map((_, i) => -i * DEGREE_DISTANCE)
    return checkingDifferenceList.find((checkingDifference) => {
      return Math.abs(checkingDifference - difference) < DEGREE_DISTANCE * 0.5
    })
  }

  useEffect(() => {
    setDifference((prev) => {
      const result = prev + speed
      if (result >= 0) {
        setSpeed(0)
        return 0
      }
      if (result <= -(list.length - 1) * DEGREE_DISTANCE) {
        setSpeed(0)
        return -(list.length - 1) * DEGREE_DISTANCE
      }
      const near = getNear(result)
      if (!isPointerDown && speed < 0.01 && near !== undefined) {
        setSpeed(0)
        return near
      }
      return result
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.length, speed])

  return (
    <div
      className={wrapStyle}
      onPointerDown={handlePointerDown}
      onMouseDown={handlePointerDown}
      onPointerUp={stopScroll}
      onMouseUp={stopScroll}
      onPointerLeave={stopScroll}
      onMouseLeave={stopScroll}
      onPointerMove={handlePointerMove}
      onMouseMove={handlePointerMove}
    >
      <div className={listStyle}>
        {list.map((item, index) => (
          <div
            key={item}
            className={itemStyle}
            style={assignInlineVars({ [rotateXVar]: getRoteX(index), [opacityVar]: getOpacity(index) })}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
