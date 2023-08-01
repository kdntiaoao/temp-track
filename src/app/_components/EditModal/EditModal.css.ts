import { style } from '@vanilla-extract/css'

export const wrapStyle = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgb(0, 0, 0, 0.6)',
})

export const modalStyle = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 'min(80%, 800px)',
  maxHeight: '80%',
  padding: '1rem',
  borderRadius: '2rem',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#eee',
})
