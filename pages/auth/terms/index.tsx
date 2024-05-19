import { Back } from "@/features";
import { useTranslationPages } from "@/shared/assets/hooks";
import { HeadMeta, PageTitle } from "@/shared/components";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { Blocks, InformationTextBlock } from "@/widgets";

import s from "@/pages/auth/policy/policy.module.scss";

const TermsOfService = () => {
  const { t } = useTranslationPages();

  const rightsAndResponsibilities: Blocks = {
    sections: [
      {
        content: t.block3.section1.options,
        title: t.block3.section1.title,
      },
      {
        content: t.block3.section2.options,
        title: t.block3.section2.title,
      },
      {
        content: t.block3.section3.options,
        title: t.block3.section3.title,
      },

      {
        content: t.block3.section4.options,
        title: t.block3.section4.title,
      },
    ],
  };

  return (
    <div className={s.wrapper}>
      <HeadMeta title={"Terms of Service"} />
      <Back className={s.back} text={t.back} />
      <PageTitle className={s.title} textAlign={"center"} title={t.title} />

      <InformationTextBlock
        subTitle={t.block1.subTitle}
        text={t.block1.text}
        title={t.block1.title}
      />
      <InformationTextBlock
        options={t.block2.options}
        subTitle={t.block2.subTitle}
        title={t.block2.title}
      />

      <InformationTextBlock
        blocks={rightsAndResponsibilities}
        title={t.block3.title}
      />

      <InformationTextBlock
        additionalText={t.block4.additionalText}
        options={t.block4.options}
        title={t.block4.title}
      />
      <InformationTextBlock text={t.block5.text} title={t.block5.title} />
    </div>
  );
};

TermsOfService.getLayout = getLayout;
export default TermsOfService;
