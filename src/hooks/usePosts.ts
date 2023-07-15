import { fetcher } from '@/utils/fetcher'
import { useQuery } from '@tanstack/react-query'

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export const usePosts = () => {
  const { isLoading, error, data } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () => fetcher('https://jsonplaceholder.typicode.com/posts'),
  })

  return { isLoading, error, posts: data }
}
