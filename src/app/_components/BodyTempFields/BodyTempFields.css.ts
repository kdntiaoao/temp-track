import { createVar, style } from '@vanilla-extract/css'

export const heightVar = createVar()

export const bodyTempFieldsStyle = style({
  margin: '1rem auto',
})

export const fieldWrapStyle = style({
  height: heightVar,
  overflow: 'hidden',
  transformOrigin: 'top',
  transition: 'height 0.3s ease-out',
})

export const fieldStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  minWidth: '60%',
  width: 'fit-content',
  margin: '0 auto',
})
