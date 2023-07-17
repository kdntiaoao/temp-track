'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/app/_components/Button'
import { Container } from '@/app/_components/Container'
import { Heading } from '@/app/_components/Heading'
import { LinkText } from '@/app/_components/LinkText'
import { useBodyTemp } from '@/hooks/useBodyTemp'
import { ChangeEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'

const yearList = [2020, 2021, 2022, 2023, 2024, 2025]
const monthList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const integerList = ['34', '35', '36', '37', '38', '39', '40', '41', '42']
const decimalList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export default function Page() {
  const router = useRouter()
  const { registerBodyTemp } = useBodyTemp()
  const [yearList, setYearList] = useState<number[]>([])
  const [dayList, setDayList] = useState<number[]>([])
  const [yearVal, setYearVal] = useState(2020)
  const [monthVal, setMonthVal] = useState(0)
  const [dayVal, setDayVal] = useState(1)
  const [integerVal, setIntegerVal] = useState('36')
  const [decimalVal, setDecimalVal] = useState('0')

  const handleChangeYear = (ev: ChangeEvent<HTMLSelectElement>) => {
    setYearVal(Number(ev.target.value))
  }

  const handleChangeMonth = (ev: ChangeEvent<HTMLSelectElement>) => {
    setMonthVal(Number(ev.target.value))
  }

  const handleChangeDay = (ev: ChangeEvent<HTMLSelectElement>) => {
    setDayVal(Number(ev.target.value))
  }

  const handleChangeInteger = (ev: ChangeEvent<HTMLSelectElement>) => {
    setIntegerVal(ev.target.value)
  }

  const handleChangeDecimal = (ev: ChangeEvent<HTMLSelectElement>) => {
    setDecimalVal(ev.target.value)
  }

  const handleSave = () => {
    const time = dayjs().year(yearVal).month(monthVal).date(dayVal).hour(0).minute(0).second(0).millisecond(0).valueOf()
    registerBodyTemp(time, integerVal + '.' + decimalVal)
    router.push('/')
  }

  useEffect(() => {
    const now = dayjs()
    const year = now.year()
    const month = now.month()
    const day = now.date()

    const DISPLAYED_YEAR_LENGTH = 6
    const yearList = Array(DISPLAYED_YEAR_LENGTH)
      .fill(now.year())
      .map((base, i) => {
        const baseIndex = (DISPLAYED_YEAR_LENGTH / 2) | 0
        return base + (i - baseIndex)
      })

    setYearList(yearList)
    setYearVal(year)
    setMonthVal(month)
    setDayVal(day)
  }, [])

  useEffect(() => {
    const daysInMonth = dayjs().year(yearVal).month(monthVal).daysInMonth()
    const dayList = Array(daysInMonth)
      .fill(0)
      .map((_, i) => i + 1)
    setDayList(dayList)
  }, [monthVal, yearVal])

  return (
    <Container>
      <Heading>体温を記録する</Heading>

      <div className="my-4">
        <LinkText href="/">HOME</LinkText>
      </div>

      <div className="my-4">
        <div className="my-8 text-xl">
          <select value={yearVal} onChange={handleChangeYear}>
            {yearList.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select value={monthVal} onChange={handleChangeMonth}>
            {monthList.map((month) => (
              <option key={month} value={month}>
                {month + 1}
              </option>
            ))}
          </select>
          <select value={dayVal} onChange={handleChangeDay}>
            {dayList.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>{' '}
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
    </Container>
  )
}
