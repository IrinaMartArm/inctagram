import { InformationText, InformationTitle } from "@/widgets";

type Props = {
  options?: string[];
  subTitle?: string;
  title?: string;
};

export const InformationTextBlock = ({ options, subTitle, title }: Props) => {
  return (
    <>
      {title && <InformationTitle text={title} />}

      {subTitle && <InformationTitle isSubTitle text={subTitle} />}
      {options && (
        <ul>
          {options.map((el, index) => (
            <li key={index}>
              <InformationText text={`- ${el}`} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
