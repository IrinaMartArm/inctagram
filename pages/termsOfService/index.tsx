import { HeadMeta } from "@/components/headMeta/HeadMeta";
import { getLayout } from "@/components/layout/baseLayout/BaseLayout";

const TermsOfService = () => {
  return (
    <>
      <HeadMeta title={"Terms of Service"} />
      <div>Terms of Service</div>
    </>
  );
};

TermsOfService.getLayout = getLayout;
export default TermsOfService;
