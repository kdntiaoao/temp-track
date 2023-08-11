import { createVar, style } from '@vanilla-extract/css'

export const bgcolorVar = createVar()

export const buttonStyle = style({
  display: 'grid',
  placeContent: 'center',
  width: '100%',
  padding: '0.3em 1em',
  borderRadius: '0.5em',
  backgroundColor: bgcolorVar,
  color: '#fff',
  transition: 'filter 0.3s ease-out',
  userSelect: 'none',
  ':hover': {
    filter: 'saturate(200%)',
  },
})
