import { Button } from '@rooots/ui'
import type { ButtonProps } from '@rooots/ui'

type Props = ButtonProps

const TagButton = ({ ...props }: Props) => {
  return <Button
    marginRight='$3'
    size='$3'
    fontSize='$5'
    scaleIcon={1.4}
    borderColor={'$gray7'}
    {...props}
  />
}

export default TagButton
