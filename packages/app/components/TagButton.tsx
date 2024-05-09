import { Button } from '@acme/ui'
import type { ButtonProps } from '@acme/ui'

type Props = ButtonProps

const TagButton = ({ ...props }: Props) => {
  return <Button marginRight='$3' size='$3' fontSize='$5' {...props} />
}

export default TagButton
