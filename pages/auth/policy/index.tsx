import { useTranslationPages } from "@/shared/assets/hooks";
import { HeadMeta } from "@/shared/components";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { InfoPage } from "@/widgets";

const PrivacyPolicy = () => {
  const { t } = useTranslationPages();

  return (
    <>
      <HeadMeta title={"Privacy Policy"} />
      <InfoPage numbersOfBlocks={12} t={t} />
    </>
  );
};

PrivacyPolicy.getLayout = getLayout;
export default PrivacyPolicy;
