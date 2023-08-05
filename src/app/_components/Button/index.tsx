import { assignInlineVars } from '@vanilla-extract/dynamic'
import { bgcolorVar, buttonStyle } from './Button.css'
import { vars } from '@/app/theme.css'
import { useMemo } from 'react'

type Props = {
  children: React.ReactNode
  color?: string
  component?: React.ElementType
  onClick?: () => void
} & React.ComponentPropsWithoutRef<React.ElementType>

export const Button = ({
  children,
  color = vars.color.primary['60'],
  component: Tag = 'button',
  onClick,
  ...others
}: Props) => {
  const typeAttribute = useMemo<string | null>(() => {
    if (others.type) {
      return others.type
    }
    if (Tag === 'button') {
      return 'button'
    }
    return null
  }, [Tag, others.type])

  return (
    <Tag
      type={typeAttribute}
      className={buttonStyle}
      style={assignInlineVars({ [bgcolorVar]: color })}
      onClick={onClick}
      {...others}
    >
      {children}
    </Tag>
  )
}
