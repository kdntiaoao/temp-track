export const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const fetcher = async (url: string) => {
  const res = await fetch(url)
  const json = await res.json()
  await sleep(2000)
  return json
}
