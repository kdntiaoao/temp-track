import { ComplexStyleRule, style } from '@vanilla-extract/css'

const arrowIconBaseStyle: ComplexStyleRule = {
  position: 'relative',
  display: 'inline-block',
  width: '1.2em',
  height: '1.2em',
  scale: 0.6,
}

const barBaseStyle: ComplexStyleRule = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transformOrigin: 'calc(1em - 1.5px) center',
  width: '1em',
  height: '3px',
  content: '',
  backgroundColor: 'currentcolor',
  borderRadius: '999px',
}

export const arrowIconStyle = style({
  ...arrowIconBaseStyle,
  selectors: {
    '&::before': {
      ...barBaseStyle,
      transform: 'translate(-50%, 0%) rotate(45deg)',
    },
    '&::after': {
      ...barBaseStyle,
      transform: 'translate(-50%, 0%) rotate(-45deg)',
    },
  },
})
