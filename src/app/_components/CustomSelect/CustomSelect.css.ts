import { ComplexStyleRule, createVar, style } from '@vanilla-extract/css'

const radius = 60

export const opacityVar = createVar()
export const rotateXVar = createVar()

const containerBaseStyle: ComplexStyleRule = {
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
  transformStyle: 'preserve-3d',
  perspective: '800px',
  width: `100%`,
  userSelect: 'none',
  overflow: 'hidden',
}

export const containerSmStyle = style({
  ...containerBaseStyle,
  padding: `${radius / 3}px ${radius / 3}px`,
  fontSize: '0.9em',
})

export const containerMdStyle = style({
  ...containerBaseStyle,
  padding: `${radius / 1.5}px ${radius / 2}px`,
})

const itemBaseStyle: ComplexStyleRule = {
  display: 'grid',
  placeContent: 'center',
  gridColumn: 1 / 1,
  gridRow: 1 / 1,
  width: `100%`,
  opacity: opacityVar,
}

export const itemSmStyle = style({
  ...itemBaseStyle,
  transform: `rotateX(${rotateXVar}) translateZ(${radius / 1.5}px)`,
})

export const itemMdStyle = style({
  ...itemBaseStyle,
  transform: `rotateX(${rotateXVar}) translateZ(${radius}px)`,
})
