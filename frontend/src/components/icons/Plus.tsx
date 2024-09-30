
import { IconProps } from '../../types/components'
import iconSizes from '../../constants/iconSizes'

const Plus = ({size = 'md'}: IconProps) => {
  return (
    <svg role="img" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width={iconSizes[size]} height={iconSizes[size]}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}
export default Plus