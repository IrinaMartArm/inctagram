import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getMainLayout } from "@/shared/components/layout/mainLayout/MainLayout";

const TermsOfService = () => {
  return (
    <PageWrapper>
      <HeadMeta title={"Terms of Service"} />
      <div>Terms of Service</div>
    </PageWrapper>
  );
};

TermsOfService.getLayout = getMainLayout;
export default TermsOfService;
