import Image from 'next/image'
import Link from 'next/link'
import { Container } from '../Container'
import { Heading } from '../Heading'
import { headingLinkStyle } from './DefaultLayout.css'

import logoImage from '@/assets/images/logo.png'

type Props = {
  children: React.ReactNode
}

export const DefaultLayout = ({ children }: Props) => {
  return (
    <>
      <Container>
        <Link href="/" className={headingLinkStyle}>
          <Heading>
            <Image src={logoImage} alt="" width={32} height={32} />
            TempTrack
          </Heading>
        </Link>

        {children}
      </Container>
    </>
  )
}
