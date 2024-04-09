import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getMainLayout } from "@/shared/components/layout/mainLayout/MainLayout";

const PrivacyPolicy = () => {
  return (
    <PageWrapper>
      <HeadMeta title={"Privacy Policy"} />
      <div>Privacy Policy</div>
    </PageWrapper>
  );
};

PrivacyPolicy.getLayout = getMainLayout;
export default PrivacyPolicy;
