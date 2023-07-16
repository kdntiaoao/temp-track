'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/app/_components/Button'
import { Container } from '@/app/_components/Container'
import { Heading } from '@/app/_components/Heading'
import { LinkText } from '@/app/_components/LinkText'
import { useBodyTemp } from '@/hooks/useBodyTemp'
import { ChangeEvent, useState } from 'react'

const integerList = ['34', '35', '36', '37', '38', '39', '40', '41', '42']
const decimalList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export default function Page() {
  const router = useRouter()
  const { registerBodyTemp } = useBodyTemp()
  const [integerVal, setIntegerVal] = useState('36')
  const [decimalVal, setDecimalVal] = useState('0')

  const handleChangeInteger = (ev: ChangeEvent<HTMLSelectElement>) => {
    setIntegerVal(ev.target.value)
  }

  const handleChangeDecimal = (ev: ChangeEvent<HTMLSelectElement>) => {
    setDecimalVal(ev.target.value)
  }

  const handleSave = () => {
    registerBodyTemp(integerVal + '.' + decimalVal)
    router.push('/')
  }

  return (
    <Container>
      <Heading>体温を記録する</Heading>

      <div className="my-4">
        <LinkText href="/">HOME</LinkText>
      </div>

      <div className="my-4">
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
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>

        <Button onClick={handleSave}>記録する</Button>
      </div>
    </Container>
  )
}
