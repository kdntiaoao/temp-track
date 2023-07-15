import { style } from '@vanilla-extract/css'
import bg01 from '@/assets/images/bg01.jpg'

export const bgStyle = style({
  position: 'fixed',
  inset: 0,
  zIndex: -1,
  backgroundImage: `url(${bg01.src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  filter: 'blur(5px) opacity(0.6)',
})

export const imgStyle = style({
  width: '400px',
  height: '300px',
  margin: '1rem',
  objectFit: 'contain',
  objectPosition: 'center',
  border: '2px solid red',
})
