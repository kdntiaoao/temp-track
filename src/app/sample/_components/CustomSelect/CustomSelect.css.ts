import { createVar, style } from '@vanilla-extract/css'

const radius = 100

export const rotateXVar = createVar()

export const containerStyle = style({
  display: 'grid',
  alignItems: 'center',
  transformStyle: 'preserve-3d',
  perspective: '800px',
  width: `100%`,
  padding: `${radius - 10}px ${radius / 3}px`,
  margin: '2rem auto',
  userSelect: 'none',
  overflow: 'hidden',
  outline: '1px solid red',
  selectors: {
    '&::after': {
      content: '',
      display: 'block',
      width: '100%',
      height: '1px',
      scale: '2 1',
      gridColumn: 1 / 1,
      gridRow: 1 / 1,
      backgroundColor: 'blue',
    },
  },
})

export const itemStyle = style({
  display: 'grid',
  placeContent: 'center',
  gridColumn: 1 / 1,
  gridRow: 1 / 1,
  width: `100%`,
  backgroundColor: '#ddd',
  opacity: 0.6,
  border: '2px solid #aaa',
  transform: `rotateX(${rotateXVar}) translateZ(${radius}px)`,
})
