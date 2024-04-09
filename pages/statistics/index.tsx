import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getMainLayout } from "@/shared/components/layout/mainLayout/MainLayout";

const Statistics = () => {
  return (
    <PageWrapper>
      <HeadMeta title={"Statistics"} />
      <div>Statistics</div>
    </PageWrapper>
  );
};

Statistics.getLayout = getMainLayout;
export default Statistics;
