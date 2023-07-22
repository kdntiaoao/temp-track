'use state'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import { dragAreaStyle, itemStyle, listStyle, opacityVar, rotateXVar, wrapStyle } from './CustomSelect.css'
import { useCallback, useEffect, useMemo, useState } from 'react'

type Props = {
  list: string[]
  selectedVal: string
  onChange: (val: string) => void
}

const DEGREE_DISTANCE = 30
let requestId = 0

export const CustomSelect = ({ list, selectedVal, onChange }: Props) => {
  const [isPointerDown, setIsPointerDown] = useState(false)
  const [startingY, setStartingY] = useState(0)
  const [difference, setDifference] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [isDisplayedDragArea, setIsDisplayedDragArea] = useState(false)

  // ちょうどよいdifference
  const stopingDifferenceList = useMemo(() => {
    return list.map((item, i) => ({ value: item, difference: -i * DEGREE_DISTANCE }))
  }, [list])

  const handlePointerDown = (
    ev: React.PointerEvent<HTMLElement> | React.TouchEvent<HTMLElement> | React.MouseEvent<HTMLElement>
  ) => {
    window.cancelAnimationFrame(requestId)
    setIsPointerDown(true)

    const clientY =
      (ev as React.PointerEvent<HTMLElement>).clientY || (ev as React.TouchEvent<HTMLElement>).touches[0].clientY
    setStartingY(clientY)

    setSpeed(0)
    setIsDisplayedDragArea(true)
  }

  const animateStopScroll = useCallback(() => {
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
  }, [])

  const stopScroll = useCallback(() => {
    setIsPointerDown(false)
    setIsDisplayedDragArea(false)
    animateStopScroll()
  }, [animateStopScroll])

  const handlePointerMove = useCallback(
    (ev: MouseEvent | PointerEvent | TouchEvent) => {
      if (!isPointerDown) return

      if (ev instanceof MouseEvent) {
        const delta = (ev.clientY - startingY) / 1000
        setSpeed((speed) => speed + delta)
      } else if (ev instanceof TouchEvent) {
        const delta = (ev.touches[0].clientY - startingY) / 1000
        setSpeed((speed) => speed + delta)
      } else {
        console.error('予期しないイベントです')
      }
    },
    [isPointerDown, startingY]
  )

  const getRoteX = (index: number) => {
    const degree = index * DEGREE_DISTANCE + difference
    return -degree + 'deg'
  }

  const getOpacity = (index: number) => {
    const absDegree = Math.abs(index * DEGREE_DISTANCE + difference)
    if (absDegree > 90) {
      return '0'
    }
    return ((90 - absDegree) / 90).toString()
  }

  const getNear = (difference: number) => {
    return stopingDifferenceList.find((item) => Math.abs(item.difference - difference) < DEGREE_DISTANCE * 0.5)
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
        return near.difference
      }
      return result
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.length, speed])

  useEffect(() => {
    if (speed === 0) {
      const selected = stopingDifferenceList.find((item) => item.difference === difference)
      console.log(selected?.value)
      if (selected !== undefined) {
        onChange(selected.value)
      }
    }
  }, [difference, onChange, speed, stopingDifferenceList])

  useEffect(() => {
    const selectedIndex = list.indexOf(selectedVal)
    setDifference(-selectedIndex * DEGREE_DISTANCE)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list])

  // スクロールイベント
  useEffect(() => {
    // 一回すべてのイベントを削除
    window.onpointerup = null
    window.ontouchend = null
    window.onmouseup = null
    window.onpointerleave = null
    window.onmouseleave = null
    window.onpointermove = null
    window.ontouchmove = null
    window.onmousemove = null

    // イベント設定
    window.onpointerup = stopScroll
    window.ontouchend = stopScroll
    window.onmouseup = stopScroll
    window.onpointerleave = stopScroll
    window.onmouseleave = stopScroll
    window.onpointermove = handlePointerMove
    window.ontouchmove = handlePointerMove
    window.onmousemove = handlePointerMove

    return () => {
      window.onpointerup = null
      window.onmouseup = null
      window.onpointerleave = null
      window.onmouseleave = null
      window.onpointermove = null
      window.onmousemove = null
    }
  }, [handlePointerMove, stopScroll])

  useEffect(() => {
    if (isPointerDown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isPointerDown])

  return (
    <>
      <div
        className={wrapStyle}
        onPointerDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        onMouseDown={handlePointerDown}
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

      {isDisplayedDragArea && <div className={dragAreaStyle}></div>}
    </>
  )
}
