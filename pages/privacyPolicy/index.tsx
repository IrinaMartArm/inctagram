import { HeadMeta } from "@/components/headMeta/HeadMeta";
import { getLayout } from "@/components/layout/baseLayout/BaseLayout";

const PrivacyPolicy = () => {
  return (
    <>
      <HeadMeta title={"Privacy Policy"} />
      <div>Privacy Policy</div>;
    </>
  );
};

PrivacyPolicy.getLayout = getLayout;
export default PrivacyPolicy;
