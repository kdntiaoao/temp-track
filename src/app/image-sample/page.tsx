import Image from 'next/image'
import { Container } from '../_components/Container'
import { Heading } from '../_components/Heading'
import { LinkText } from '../_components/LinkText'
import { bgStyle, imgStyle } from './styles.css'

import sample01 from '@/assets/images/sample01.jpg'
import sample02 from '@/assets/images/sample02.jpg'

export default function Page() {
  return (
    <>
      <div className={bgStyle}></div>

      <Container>
        <Heading component="h2">Image Sample</Heading>

        <div className="my-4">
          <LinkText href="/">HOME</LinkText>
        </div>

        <div>
          <Image priority src={sample01} alt="Sample 1" className={imgStyle} />
          <Image priority src={sample02} alt="Sample 2" className={imgStyle} />
        </div>
      </Container>
    </>
  )
}
