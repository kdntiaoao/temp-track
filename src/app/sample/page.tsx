import { Container } from '../_components/Container'
import { Heading } from '../_components/Heading'
import { LinkText } from '../_components/LinkText'
import { paragraph01Style, paragraph02Style } from './styles.css'

export default function Page() {
  return (
    <Container>
      <Heading component="h2">Sample Page</Heading>

      <div className="my-4">
        <LinkText href="/">HOME</LinkText>
      </div>

      <p className={paragraph01Style}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima magnam, neque labore nisi tempore aspernatur
        aliquam repellat fugit? Esse quo mollitia dolorem? Ipsum ea possimus necessitatibus aliquid, facere nihil
        deleniti?
      </p>

      <p className={paragraph02Style}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima magnam, neque labore nisi tempore aspernatur
        aliquam repellat fugit? Esse quo mollitia dolorem? Ipsum ea possimus necessitatibus aliquid, facere nihil
        deleniti?
      </p>
    </Container>
  )
}
