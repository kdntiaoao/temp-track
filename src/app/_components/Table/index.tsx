'use client'

import { useEffect, useRef, useState } from 'react'
import { buttonGroupStyle, tableStyle, tableWrapStyle, tdRowStyle, tdStyle, thRowStyle, thStyle } from './Table.css'
import dayjs from 'dayjs'
import { Button } from '../Button'
import { vars } from '@/app/theme.css'
import { useBodyTemp } from '@/hooks/useBodyTemp'

export const Table = () => {
  const [isScrollable, setIsScrollable] = useState(false)
  const tableRef = useRef<HTMLTableElement>(null)
  const { bodyTempList } = useBodyTemp()

  const handleScroll = (ev: React.UIEvent<HTMLTableElement, UIEvent>) => {
    const target = ev.target as HTMLTableElement
    if (tableRef.current!.scrollWidth <= tableRef.current!.clientWidth + target.scrollLeft + 10) {
      setIsScrollable(false)
    }
  }

  const handleClickEdit = () => {
    alert('Click Edit Button!!')
  }

  const handleClickDel = () => {
    alert('Click Delete Button!!')
  }

  useEffect(() => {
    if (!tableRef.current) return
    setIsScrollable(tableRef.current.scrollWidth > tableRef.current.clientWidth + tableRef.current.scrollLeft)
  }, [])

  if (!bodyTempList || bodyTempList.length === 0) {
    return <p>記録がありません。</p>
  }

  return (
    <div className={`${tableWrapStyle} ${isScrollable && 'scrollable'}`}>
      <table ref={tableRef} className={tableStyle} onScroll={handleScroll}>
        <thead>
          <tr className={thRowStyle}>
            <th className={thStyle}>日付</th>
            <th className={thStyle}>体温</th>
          </tr>
        </thead>
        <tbody>
          {bodyTempList.map((bodyTemp, i) => (
            <tr key={i} className={tdRowStyle}>
              <td className={tdStyle}>{dayjs(bodyTemp.time).format('YYYY年MM月DD日')}</td>
              <td className={tdStyle}>{bodyTemp.bodyTemp}</td>
              <td className={tdStyle}>
                <span className={buttonGroupStyle}>
                  <Button onClick={handleClickEdit}>編集</Button>
                  <Button color={vars.color.error['60']} onClick={handleClickDel}>
                    削除
                  </Button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
