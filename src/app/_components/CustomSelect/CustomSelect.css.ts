import { createVar, style } from '@vanilla-extract/css'

export const rotateXVar = createVar()
export const opacityVar = createVar()

export const wrapStyle = style({
  display: 'grid',
  placeContent: 'center',
  gridTemplateColumns: '100%',
  width: '300px',
  height: '500px',
  transformStyle: 'preserve-3d',
  perspective: '1000px',
  outline: '1px solid red',
  userSelect: 'none',
})

export const listStyle = style({
  position: 'relative',
  width: '100%',
  height: '24px',
  selectors: {
    '&::after': {
      position: 'absolute',
      content: '',
      top: '50%',
      left: 0,
      right: 0,
      height: '1px',
      display: 'block',
      backgroundColor: 'red',
      transform: '0 -50%',
    },
  },
})

export const itemStyle = style({
  position: 'absolute',
  inset: 0,
  display: 'grid',
  placeContent: 'center',
  outline: '1px solid blue',
  // transform: `rotateX(${rotateXVar}) translateZ(60px)`,
  transform: `rotateX(${rotateXVar}) translateZ(200px)`,
  opacity: opacityVar,
})
