import { InformationText, InformationTitle } from "./ui";

type Section = {
  content?: string[];
  title: string;
};

export type Blocks = {
  sections: Section[];
};

type Props = {
  additionalText?: string;
  blocks?: Blocks;
  options?: string[];
  subTitle?: string;
  text?: string;
  title?: string;
};

export const InformationTextBlock = ({
  additionalText,
  blocks,
  options,
  subTitle,
  text,
  title,
}: Props) => {
  return (
    <>
      {title && <InformationTitle text={title} />}
      {text && <InformationText text={text} />}

      {subTitle && <InformationTitle isSubTitle text={subTitle} />}

      {blocks &&
        blocks.sections.map((section, index) => (
          <div key={index}>
            <InformationTitle isSubTitle text={section.title} />
            <ul>
              {section.content?.map((item, index) => (
                <li key={index}>
                  <InformationText text={`- ${item}`} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      {options && (
        <ul>
          {options.map((el, index) => (
            <li key={index}>
              <InformationText text={`- ${el}`} />
            </li>
          ))}
        </ul>
      )}
      {additionalText && <InformationText text={additionalText} />}
    </>
  );
};
