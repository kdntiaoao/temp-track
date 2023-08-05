import { style } from '@vanilla-extract/css'

export const wrapStyle = style({
  position: 'fixed',
  inset: 0,
  display: 'grid',
  placeItems: 'center',
  backgroundColor: 'rgb(0, 0, 0, 0.6)',
})

export const modalStyle = style({
  width: 'min(80%, 600px)',
  maxHeight: '80%',
  padding: '1rem',
  borderRadius: '2rem',
  backgroundColor: '#eee',
})
