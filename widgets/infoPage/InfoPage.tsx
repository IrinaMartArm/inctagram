import { Back } from "@/features";
import { PageTitle } from "@/shared/components";

import s from "./infoPage.module.scss";

import { Content, InformationTextBlock } from "./ui";

export type LocaleInfo = {
  [key: number]: Content;
  back: string;
  title: string;
};

type Props = {
  numbersOfBlocks: number;
  t: LocaleInfo;
};

export const InfoPage = ({ numbersOfBlocks, t }: Props) => {
  const contentBlocks = Array.from(
    { length: numbersOfBlocks },
    (_, i) => i + 1,
  );

  return (
    <div className={s.wrapper}>
      <Back className={s.back} text={t.back} />
      <PageTitle className={s.title} textAlign={"center"} title={t.title} />
      {contentBlocks.map((block) => (
        <InformationTextBlock content={t[block]} key={block} />
      ))}
    </div>
  );
};
