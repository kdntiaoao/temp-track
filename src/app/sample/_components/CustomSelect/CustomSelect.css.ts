import { createVar, style } from '@vanilla-extract/css'

const itemWidth = 500
const itemHeight = 60
const marginX = 0
const marginY = 100
const containerWidth = itemWidth + marginX * 2
const containerHeight = itemHeight + marginY * 2

export const transformVar = createVar()

export const containerStyle = style({
  display: 'grid',
  placeItems: 'center',
  transformStyle: 'preserve-3d',
  perspective: '800px',
  width: `${containerWidth}px`,
  height: `${containerHeight}px`,
  padding: `${marginY} ${marginX}`,
  margin: '10rem auto',
  outline: '1px solid red',
})

export const itemStyle = style({
  display: 'grid',
  placeContent: 'center',
  gridColumn: 1 / 1,
  gridRow: 1 / 1,
  width: itemWidth,
  height: itemHeight,
  backgroundColor: '#ddd',
  opacity: 0.6,
  border: '2px solid #aaa',
  fontSize: '3rem',
  transform: transformVar,
})
