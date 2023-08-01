import { style } from '@vanilla-extract/css'

export const tableWrapStyle = style({
  position: 'relative',
  selectors: {
    '&::after': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      display: 'block',
      width: '15%',
      content: '',
      background: 'linear-gradient(90deg, rgb(255, 255, 255, 0.2), rgb(255, 255, 255, 0.9))',
      opacity: 0,
      transition: 'opacity 0.3s',
      pointerEvents: 'none',
    },
    '&.scrollable::after': {
      opacity: 1,
    },
  },
})

export const tableStyle = style({
  display: 'block',
  overflow: 'auto',
  textAlign: 'center',
  whiteSpace: 'nowrap',
})

export const thRowStyle = style({
  borderBottom: '2px solid #aaa',
})

export const thStyle = style({
  padding: '0.5rem 2rem',
})

export const tdRowStyle = style({})

export const tdStyle = style({
  padding: '0.5rem 2rem',
})

export const buttonGroupStyle = style({
  display: 'flex',
  gap: '0.5rem',
})
