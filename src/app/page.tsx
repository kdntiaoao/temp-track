import { LinkText } from './_components/LinkText'
import { Heading } from './_components/Heading'
import { Container } from './_components/Container'

export default function Home() {
  return (
    <Container>
      <Heading>Hello, World!</Heading>

      <ul>
        <li>
          <LinkText href="/sample">Sample</LinkText>
        </li>
        <li>
          <LinkText href="/image-sample">Image Sample</LinkText>
        </li>
        <li>
          <LinkText href="/posts">Posts</LinkText>
        </li>
        <li>
          <LinkText href="/posts2">Posts 2</LinkText>
        </li>
      </ul>
    </Container>
  )
}
