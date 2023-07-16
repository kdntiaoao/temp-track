'use client'

import { Heading } from '../_components/Heading'
import { Container } from '../_components/Container'
import { LinkText } from '../_components/LinkText'
import { usePosts } from '@/hooks/usePosts'
import { vt323 } from '@/font/font'
import { indexStyle } from './styles.css'

export default function Page() {
  const { isLoading, error, posts } = usePosts()

  return (
    <Container>
      <Heading>Posts</Heading>

      <div className="my-4">
        <LinkText href="/">HOME</LinkText>
      </div>

      {error instanceof Error && <p>An error has occurred: {error.message}</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>
              <span className={`${vt323.className} ${indexStyle}`}>{post.id}. </span>
              Title: <LinkText href={`/posts/${post.id}`}>{post.title}</LinkText>
            </li>
          ))}
        </ul>
      )}
    </Container>
  )
}
