import type { UseLinkProps } from 'solito/link'
import { useLink } from 'solito/navigation'
import { Button } from '@acme/ui'
import type { ButtonProps } from '@acme/ui'

type Props = UseLinkProps & Omit<ButtonProps, keyof UseLinkProps | keyof ReturnType<typeof useLink>>

const LinkButton = ({ href, ...props }: Props) => {
  const hrefString = typeof href === 'string' ? href : href.href
  const linkProps = useLink({
    href: hrefString ?? '',
  })

  return <Button {...props} {...linkProps} />
}

export default LinkButton
