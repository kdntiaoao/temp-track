import { vars } from '@/app/theme.css'
import { style } from '@vanilla-extract/css'

const myVars = {
  '--bg-sample': 'crimson',
}

const paragraphBaseStyle = {
  margin: '2rem 1rem',
  padding: '1rem',
  border: '1px solid orange',
  color: '#fff',
  transition: 'background-color 0.3s ease-out',
  '@media': {
    'screen and (max-width: 768px)': {
      margin: '1rem 0.1rem',
    },
  },
}

export const paragraph01Style = style({
  vars: myVars,
  ...paragraphBaseStyle,
  backgroundColor: `var(--bg-sample)`,
  selectors: {
    '&:hover': {
      backgroundColor: 'red',
    },
  },
})

export const paragraph02Style = style({
  ...paragraphBaseStyle,
  backgroundColor: vars.color.primary['60'],
  ':hover': {
    backgroundColor: vars.color.primary['40'],
  },
})
