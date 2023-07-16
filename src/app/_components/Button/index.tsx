import { assignInlineVars } from '@vanilla-extract/dynamic'
import { bgcolorVar, buttonStyle } from './Button.css'
import { vars } from '@/app/theme.css'

type Props = {
  children: React.ReactNode
  color?: string
  onClick: () => void
}

export const Button = ({ children, color = vars.color.primary['60'], onClick }: Props) => {
  return (
    <button type="button" className={buttonStyle} style={assignInlineVars({ [bgcolorVar]: color })} onClick={onClick}>
      {children}
    </button>
  )
}
