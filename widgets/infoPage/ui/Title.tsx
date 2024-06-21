import { Typography } from '@/shared/components'

type Props = {
  isSubTitle?: boolean
  text: string
}

export const InformationTitle = ({ isSubTitle = false, text }: Props) => {
  const variant = isSubTitle ? 'bold_text-14' : 'h3'
  const asElement = isSubTitle ? 'h4' : 'h3'
  const align = isSubTitle ? 'left' : 'center'

  return (
    <Typography
      as={asElement}
      style={{ marginBottom: 12, marginTop: 24, textAlign: align }}
      variant={variant}
    >
      {text}
    </Typography>
  )
}
