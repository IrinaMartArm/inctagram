import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getMainLayout } from "@/shared/components/layout/mainLayout/MainLayout";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <HeadMeta title={"Privacy Policy"} />
      <div>{t.policy.title}</div>
    </PageWrapper>
  );
};

PrivacyPolicy.getLayout = getMainLayout;
export default PrivacyPolicy;
