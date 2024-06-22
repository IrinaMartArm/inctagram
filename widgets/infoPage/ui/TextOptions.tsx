import { InformationText } from './Text'

type Props = {
  options: string[]
}

export const TextOptions = ({ options }: Props) => {
  return (
    <ul>
      {options?.map((item, index) => (
        <li key={index}>
          <InformationText text={`- ${item}`} />
        </li>
      ))}
    </ul>
  )
}
