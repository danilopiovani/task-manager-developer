import { IconProps } from '../../types/components'
import iconSizes from '../../constants/iconSizes'

const Close = ({size = 'md'}: IconProps) => {
  return (
    <svg role="img" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width={iconSizes[size]} height={iconSizes[size]}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  
  )
}
export default Close