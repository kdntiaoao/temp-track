'use client'

import { useEffect, useState } from 'react'
import { modalStyle, wrapStyle } from './styles.css'
import { CustomSelect } from '../CustomSelect'
import dayjs from 'dayjs'
import { Button } from '../Button'
import { useBodyTemp } from '@/hooks/useBodyTemp'

type Props = { edittedId: string; onClose: () => void }

const monthList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
const integerList = ['34', '35', '36', '37', '38', '39', '40', '41', '42']
const decimalList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export const EditModal = ({ edittedId, onClose }: Props) => {
  const { bodyTempList, editBodyTemp } = useBodyTemp()
  const [yearList, setYearList] = useState<string[]>([])
  const [dayList, setDayList] = useState<string[]>([])
  const [yearVal, setYearVal] = useState<string>()
  const [monthVal, setMonthVal] = useState<string>()
  const [dayVal, setDayVal] = useState<string>()
  const [integerVal, setIntegerVal] = useState('36')
  const [decimalVal, setDecimalVal] = useState('0')

  const handleChangeYear = (val: string) => {
    setYearVal(val)
  }

  const handleChangeMonth = (val: string) => {
    setMonthVal(val)
  }

  const handleChangeDay = (val: string) => {
    setDayVal(val)
  }

  const handleChangeInteger = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setIntegerVal(ev.target.value)
  }

  const handleChangeDecimal = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setDecimalVal(ev.target.value)
  }

  const handleSave = () => {
    const time = dayjs()
      .year(Number(yearVal))
      .month(Number(monthVal) - 1)
      .date(Number(dayVal))
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .valueOf()
    console.log({ yearVal, monthVal, dayVal })
    editBodyTemp(edittedId, time, integerVal + '.' + decimalVal)

    onClose()
  }

  useEffect(() => {
    const editted = bodyTempList?.find((b) => b.id === edittedId)
    if (editted?.time) {
      setYearVal(dayjs(editted.time).year().toString())
      setMonthVal((dayjs(editted.time).month() + 1).toString())
      setDayVal(dayjs(editted.time).date().toString())
    }
  }, [bodyTempList, edittedId])

  useEffect(() => {
    const now = dayjs()

    const DISPLAYED_YEAR_LENGTH = 500
    const yearList = Array(DISPLAYED_YEAR_LENGTH)
      .fill(now.year())
      .map((base: number, i) => {
        const baseIndex = (DISPLAYED_YEAR_LENGTH / 2) | 0
        return (base + (i - baseIndex)).toString()
      })

    setYearList(yearList)
  }, [])

  useEffect(() => {
    if (!yearVal || !monthVal) return
    const daysInMonth = dayjs()
      .year(Number(yearVal))
      .month(Number(monthVal) - 1)
      .daysInMonth()
    const dayList = Array(daysInMonth)
      .fill(0)
      .map((_, i) => (i + 1).toString())
    setDayList(dayList)
  }, [monthVal, yearVal])

  return (
    <div className={wrapStyle}>
      <div className={modalStyle}>
        <div className="flex gap-4">
          {yearVal && monthVal && dayVal && (
            <>
              <CustomSelect list={yearList} selectedVal={yearVal} onChange={handleChangeYear} />
              <CustomSelect list={monthList} selectedVal={monthVal} onChange={handleChangeMonth} />
              <CustomSelect list={dayList} selectedVal={dayVal} onChange={handleChangeDay} />
            </>
          )}
        </div>

        <div className="my-8 text-xl">
          <select value={integerVal} onChange={handleChangeInteger}>
            {integerList.map((integer) => (
              <option key={integer} value={integer}>
                {integer}
              </option>
            ))}
          </select>{' '}
          .{' '}
          <select value={decimalVal} onChange={handleChangeDecimal}>
            {decimalList.map((decimal) => (
              <option key={decimal} value={decimal}>
                {decimal}
              </option>
            ))}
          </select>
        </div>

        <Button onClick={handleSave}>記録する</Button>
      </div>
    </div>
  )
}