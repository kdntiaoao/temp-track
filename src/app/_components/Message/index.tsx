import type { ReactNode } from 'react'
import { messageDisplayedStyle, messageHiddenStyle } from './Message.css'

type Props = {
  children: ReactNode
  displayed?: boolean
}

export const Message = ({ children, displayed = false }: Props) => {
  return <div className={displayed ? messageDisplayedStyle : messageHiddenStyle}>{children}</div>
}
