import { createVar, style } from '@vanilla-extract/css'

const radius = 60
const marginX = 20

export const rotateXVar = createVar()

export const containerStyle = style({
  display: 'grid',
  alignItems: 'center',
  transformStyle: 'preserve-3d',
  perspective: '800px',
  width: `100%`,
  padding: `${radius - 10}px ${marginX}px`,
  margin: '2rem auto',
  userSelect: 'none',
  overflow: 'hidden',
  outline: '1px solid red',
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
