import { Back } from "@/features";
import { useTranslationPages } from "@/shared/assets/hooks";
import { HeadMeta, PageTitle } from "@/shared/components";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { Blocks, InformationTextBlock } from "@/widgets";

import s from "./policy.module.scss";

const PrivacyPolicy = () => {
  const { t } = useTranslationPages();

  const operator: Blocks = {
    sections: [
      {
        content: t.block3.section1.options,
        title: t.block3.section1.title,
      },
      {
        content: t.block3.section2.options,
        title: t.block3.section2.title,
      },
    ],
  };

  const person: Blocks = {
    sections: [
      {
        content: t.block4.section1.options,
        title: t.block4.section1.title,
      },
      {
        content: t.block4.section2.options,
        title: t.block4.section2.title,
      },
      {
        title: t.block4.section3.title,
      },
    ],
  };

  const processingPurposes: Blocks = {
    sections: [
      {
        content: t.block6.section1.options,
        title: t.block6.section1.title,
      },
      {
        content: t.block6.section2.options,
        title: t.block6.section2.title,
      },
      {
        content: t.block6.section3.options,
        title: t.block6.section3.title,
      },

      {
        content: t.block6.section4.options,
        title: t.block6.section4.title,
      },
    ],
  };

  return (
    <div className={s.wrapper}>
      <HeadMeta title={"Privacy Policy"} />
      <Back className={s.back} text={"Back to Sign Up"} />
      <PageTitle className={s.title} textAlign={"center"} title={t.title} />

      <InformationTextBlock
        options={t.block1.options}
        text={t.block1.text}
        title={t.block1.title}
      />

      <InformationTextBlock options={t.block2.options} title={t.block2.title} />

      <InformationTextBlock blocks={operator} title={t.block3.title} />
      <InformationTextBlock blocks={person} title={t.block4.title} />

      <InformationTextBlock options={t.block5.options} title={t.block5.title} />

      <InformationTextBlock
        blocks={processingPurposes}
        title={t.block6.title}
      />

      <InformationTextBlock options={t.block7.options} title={t.block7.title} />

      <InformationTextBlock
        options={t.block8.options}
        text={t.block8.text}
        title={t.block8.title}
      />

      <InformationTextBlock options={t.block9.options} title={t.block9.title} />

      <InformationTextBlock
        options={t.block10.options}
        title={t.block10.title}
      />

      <InformationTextBlock text={t.block11.text} title={t.block11.title} />

      <InformationTextBlock
        options={t.block12.options}
        title={t.block12.title}
      />
    </div>
  );
};

PrivacyPolicy.getLayout = getLayout;
export default PrivacyPolicy;
