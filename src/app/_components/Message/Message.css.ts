import { style } from '@vanilla-extract/css'
import type { ComplexStyleRule } from '@vanilla-extract/css'

const messageBaseStyle: ComplexStyleRule = {
  position: 'fixed',
  bottom: '1rem',
  right: '1rem',
  width: '60%',
  maxWidth: '24rem',
  padding: '0.8rem',
  background: 'linear-gradient(-90deg, #A5CD89, #A4DEAC)',
  transition: 'opacity 0.3s',
  borderRadius: '0.5rem',
}

export const messageDisplayedStyle = style({
  ...messageBaseStyle,
  opacity: 1,
})

export const messageHiddenStyle = style({
  ...messageBaseStyle,
  opacity: 0,
  pointerEvents: 'none',
})
