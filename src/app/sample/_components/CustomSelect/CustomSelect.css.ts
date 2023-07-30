import { createVar, style } from '@vanilla-extract/css'

const itemHeight = 60
const marginX = 40
const radius = 160
const containerHeight = itemHeight + radius * 2

export const rotateXVar = createVar()

export const containerStyle = style({
  display: 'grid',
  placeItems: 'center',
  transformStyle: 'preserve-3d',
  perspective: '800px',
  width: `100%`,
  height: `${containerHeight}px`,
  padding: `${radius}px ${marginX}px`,
  margin: '10rem auto',
  userSelect: 'none',
  outline: '1px solid red',
})

export const itemStyle = style({
  display: 'grid',
  placeContent: 'center',
  gridColumn: 1 / 1,
  gridRow: 1 / 1,
  width: `100%`,
  height: itemHeight,
  backgroundColor: '#ddd',
  opacity: 0.6,
  border: '2px solid #aaa',
  fontSize: '3rem',
  transform: `rotateX(${rotateXVar}) translateZ(${radius}px)`,
})
