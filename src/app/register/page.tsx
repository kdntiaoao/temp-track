'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/app/_components/Button'
import { Container } from '@/app/_components/Container'
import { Heading } from '@/app/_components/Heading'
import { LinkText } from '@/app/_components/LinkText'
import { useBodyTemp } from '@/hooks/useBodyTemp'
import { ChangeEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { CustomSelect } from '../_components/CustomSelect'

const monthList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
const integerList = ['34', '35', '36', '37', '38', '39', '40', '41', '42']
const decimalList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export default function Page() {
  const router = useRouter()
  const { registerBodyTemp } = useBodyTemp()
  const [yearList, setYearList] = useState<string[]>([])
  const [dayList, setDayList] = useState<string[]>([])
  const [yearVal, setYearVal] = useState<string>()
  const [monthVal, setMonthVal] = useState<string>()
  const [dayVal, setDayVal] = useState<string>()
  const [integerVal, setIntegerVal] = useState('36')
  const [decimalVal, setDecimalVal] = useState('0')

  const handleChangeYear = (ev: ChangeEvent<HTMLSelectElement>) => {
    setYearVal(ev.target.value)
  }

  const handleChangeYear2 = (val: string) => {
    setYearVal(val)
  }

  const handleChangeMonth = (ev: ChangeEvent<HTMLSelectElement>) => {
    setMonthVal(ev.target.value)
  }

  const handleChangeMonth2 = (val: string) => {
    setMonthVal(val)
  }

  const handleChangeDay = (ev: ChangeEvent<HTMLSelectElement>) => {
    setDayVal(ev.target.value)
  }

  const handleChangeDay2 = (val: string) => {
    setDayVal(val)
  }

  const handleChangeInteger = (ev: ChangeEvent<HTMLSelectElement>) => {
    setIntegerVal(ev.target.value)
  }

  const handleChangeDecimal = (ev: ChangeEvent<HTMLSelectElement>) => {
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
    registerBodyTemp(time, integerVal + '.' + decimalVal)
    router.push('/')
  }

  useEffect(() => {
    const now = dayjs()
    const year = now.year()
    const month = now.month()
    const day = now.date()

    const DISPLAYED_YEAR_LENGTH = 500
    const yearList = Array(DISPLAYED_YEAR_LENGTH)
      .fill(now.year())
      .map((base: number, i) => {
        const baseIndex = (DISPLAYED_YEAR_LENGTH / 2) | 0
        return (base + (i - baseIndex)).toString()
      })

    console.log({ year, month, day })

    setYearList(yearList)
    setYearVal(year.toString())
    setMonthVal((month + 1).toString())
    setDayVal(day.toString())
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
    <Container>
      <Heading>体温を記録する</Heading>

      <div className="my-4">
        <LinkText href="/">HOME</LinkText>
      </div>

      <div className="my-4">
        <div className="my-8 flex gap-4">
          {yearVal && monthVal && dayVal && (
            <>
              <CustomSelect list={yearList} selectedVal={yearVal} onChange={handleChangeYear2} />
              <CustomSelect list={monthList} selectedVal={monthVal} onChange={handleChangeMonth2} />
              <CustomSelect list={dayList} selectedVal={dayVal} onChange={handleChangeDay2} />
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
    </Container>
  )
}
