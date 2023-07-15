import { heading } from './Heading.css'

type Props = {
  children: React.ReactNode
  component?: keyof JSX.IntrinsicElements
}

export const Heading = ({ children, component: CustomTag = 'h1' }: Props) => {
  return <CustomTag className={heading}>{children}</CustomTag>
}
