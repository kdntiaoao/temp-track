import Link from 'next/link'
import { linkText } from './LinkText.css'

type Props = {
  children: React.ReactNode
  href: string
}

export const LinkText = ({ children, href }: Props) => {
  return (
    <Link href={href} className={linkText}>
      {children}
    </Link>
  )
}
