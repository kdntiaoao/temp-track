import { useCallback, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { CustomSelect } from '../CustomSelect'
import { Button } from '../Button'
import { useBodyTemp } from '@/hooks/useBodyTemp'
import { bodyTempFieldsStyle, fieldStyle, fieldWrapStyle, heightVar } from './BodyTempFields.css'
import { assignInlineVars } from '@vanilla-extract/dynamic'

type Props = {
  edittedId?: string
  onSave: (time: number, bodyTemp: string) => void
}

const DISPLAYED_YEAR_LENGTH = 500

const monthList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
const integerList = ['34', '35', '36', '37', '38', '39', '40', '41', '42']
const decimalList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export const BodyTempFields = ({ edittedId, onSave }: Props) => {
  // prettier-ignore
  const { bodyTempList } = useBodyTemp()
  const [dateActive, setDateActive] = useState<boolean>(false)
  const [tempActive, setTempActive] = useState<boolean>(true)
  const [yearList, setYearList] = useState<string[]>([])
  const [dayList, setDayList] = useState<string[]>([])
  const [yearVal, setYearVal] = useState<string>()
  const [monthVal, setMonthVal] = useState<string>()
  const [dayVal, setDayVal] = useState<string>()
  const [integerVal, setIntegerVal] = useState<string>('36')
  const [decimalVal, setDecimalVal] = useState<string>('0')
  const [dateFieldHeight, setDateFieldHeight] = useState<number>(0)
  const [tempFieldHeight, setTempFieldHeight] = useState<number>(0)
  const dateFieldRef = useRef<HTMLDivElement>(null)
  const tempFieldRef = useRef<HTMLDivElement>(null)

  const toggleDateActive = () => {
    setDateActive((prev) => {
      const result = !prev
      if (result) {
        setTempActive(false)
      }
      return result
    })
  }

  const toggleBodyTempActive = () => {
    setTempActive((prev) => {
      const result = !prev
      if (result) {
        setDateActive(false)
      }
      return result
    })
  }

  const handleChangeYear = (val: string): void => {
    setYearVal(val)
  }

  const handleChangeMonth = (val: string): void => {
    setMonthVal(val)
  }

  const handleChangeDay = (val: string): void => {
    setDayVal(val)
  }

  const handleChangeInteger = (val: string): void => {
    setIntegerVal(val)
  }

  const handleChangeDecimal = (val: string): void => {
    setDecimalVal(val)
  }

  const handleSave = useCallback<() => void>(() => {
    const time = dayjs()
      .year(Number(yearVal))
      .month(Number(monthVal) - 1)
      .date(Number(dayVal))
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .valueOf()
    onSave(time, integerVal + '.' + decimalVal)
  }, [dayVal, decimalVal, integerVal, monthVal, onSave, yearVal])

  useEffect(() => {
    const editted = bodyTempList?.find((b) => b.id === edittedId)

    if (editted?.time) {
      setYearVal(dayjs(editted.time).year().toString())
      setMonthVal((dayjs(editted.time).month() + 1).toString())
      setDayVal(dayjs(editted.time).date().toString())
    } else {
      const now = dayjs()
      setYearVal(now.year().toString())
      setMonthVal((now.month() + 1).toString())
      setDayVal(now.date().toString())
    }
  }, [bodyTempList, edittedId])

  useEffect(() => {
    const now = dayjs()

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

    console.log(dateFieldRef.current?.offsetHeight)
    console.log(tempFieldRef.current?.offsetHeight)
    setDateFieldHeight(dateFieldRef.current?.offsetHeight || 0)
    setTempFieldHeight(tempFieldRef.current?.offsetHeight || 0)
  }, [monthVal, yearVal])

  return (
    <div
      className={bodyTempFieldsStyle}
      onPointerDown={(ev) => ev.stopPropagation()}
      onMouseDown={(ev) => ev.stopPropagation()}
    >
      <p className="mb-2">
        <button type="button" onClick={toggleDateActive}>
          日付：{yearVal}年{monthVal}月{dayVal}日
        </button>
      </p>
      <div
        className={fieldWrapStyle}
        style={assignInlineVars({ [heightVar]: dateActive ? `${dateFieldHeight}px` : '0' })}
      >
        <div className={fieldStyle} ref={dateFieldRef}>
          {yearVal && monthVal && dayVal && (
            <>
              <CustomSelect list={yearList} selectedVal={yearVal} size="sm" onChange={handleChangeYear} />
              <CustomSelect list={monthList} selectedVal={monthVal} size="sm" onChange={handleChangeMonth} />
              <CustomSelect list={dayList} selectedVal={dayVal} size="sm" onChange={handleChangeDay} />
            </>
          )}
        </div>
      </div>

      <div className="my-8">
        <p className="mb-2">
          <button type="button" onClick={toggleBodyTempActive}>
            体温：{integerVal}.{decimalVal}
          </button>
        </p>
        <div
          className={fieldWrapStyle}
          style={assignInlineVars({ [heightVar]: tempActive ? `${tempFieldHeight}px` : '0' })}
        >
          <div className={fieldStyle} ref={tempFieldRef}>
            <CustomSelect list={integerList} selectedVal={integerVal} size="sm" onChange={handleChangeInteger} /> .{' '}
            <CustomSelect list={decimalList} selectedVal={decimalVal} size="sm" onChange={handleChangeDecimal} />
          </div>
        </div>
      </div>

      <Button onClick={handleSave}>記録する</Button>
    </div>
  )
}
