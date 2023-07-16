import { vars } from '@/app/theme.css'
import { style } from '@vanilla-extract/css'

export const linkText = style({
  color: vars.color.linkText,
  textDecoration: 'underline',
  transition: 'color 0.3s ease-out',
  ':hover': {
    color: 'red',
  },
})
