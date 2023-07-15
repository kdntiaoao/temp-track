'use client'

import { useQuery } from '@tanstack/react-query'
import { Heading } from '../_components/Heading'
import { Container } from '../_components/Container'
import { LinkText } from '../_components/LinkText'
import { usePosts } from '@/hooks/usePosts'

export default function Page() {
  const { isLoading, error, posts } = usePosts()

  return (
    <Container>
      <Heading>Posts2</Heading>

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
              {post.id}. Title: {post.title}
            </li>
          ))}
        </ul>
      )}
    </Container>
  )
}
