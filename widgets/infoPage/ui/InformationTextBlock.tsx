import { InformationText } from './Text'
import { TextOptions } from './TextOptions'
import { InformationTitle } from './Title'

type Section = {
  content?: string[]
  title: string
}

export type Content = {
  additionalText?: string
  options?: string[]
  sections?: Section[]
  subTitle?: string
  text?: string
  title?: string
}

type Props = {
  content: Content
}

export const InformationTextBlock = ({ content }: Props) => {
  const { additionalText, options, sections, subTitle, text, title } = content

  return (
    <>
      {title && <InformationTitle text={title} />}
      {text && <InformationText text={text} />}

      {subTitle && <InformationTitle isSubTitle text={subTitle} />}

      {sections &&
        sections.map((section, index) => (
          <div key={index}>
            <InformationTitle isSubTitle text={section.title} />
            {section.content && <TextOptions options={section.content} />}
          </div>
        ))}
      {options && <TextOptions options={options} />}
      {additionalText && <InformationText text={additionalText} />}
    </>
  )
}
