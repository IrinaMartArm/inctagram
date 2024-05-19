import { useTranslationPages } from "@/shared/assets/hooks";
import { HeadMeta } from "@/shared/components";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { InfoPage } from "@/widgets";

const TermsOfService = () => {
  const { t } = useTranslationPages();

  return (
    <>
      <HeadMeta title={"Terms of Service"} />
      <InfoPage numbersOfBlocks={5} t={t} />
    </>
  );
};

TermsOfService.getLayout = getLayout;
export default TermsOfService;
