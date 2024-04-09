import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getMainLayout } from "@/shared/components/layout/mainLayout/MainLayout";

const General = () => {
  return (
    <PageWrapper>
      <HeadMeta title={"General"} />
      <div>General</div>
    </PageWrapper>
  );
};

General.getLayout = getMainLayout;
export default General;
