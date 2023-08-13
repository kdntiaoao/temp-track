import { useMemo } from 'react'
import { arrowIconStyle } from './ArrowIcon.css'

type Orientation = 'upward' | 'downward' | 'rightward' | 'leftward'

type Props = {
  orientation?: Orientation
}

type RotateClass = 'rotate-0' | 'rotate-90' | '-rotate-90' | 'rotate-180'

export const ArrowIcon = ({ orientation = 'rightward' }: Props) => {
  const rotateClass = useMemo<RotateClass>(() => {
    switch (orientation) {
      case 'upward':
        return '-rotate-90'
      case 'downward':
        return 'rotate-90'
      case 'rightward':
        return 'rotate-0'
      case 'leftward':
        return 'rotate-180'
      default:
        return 'rotate-0'
    }
  }, [orientation])

  return (
    <span className={`inline-flex items-center origin-center transition-transform ${rotateClass}`}>
      <span className={arrowIconStyle}></span>
    </span>
  )
}
