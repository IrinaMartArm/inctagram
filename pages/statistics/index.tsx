import { WithNavigate } from "@/shared/assets/hoc/WithNavigate";
import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getMainLayout } from "@/shared/components/layout/mainLayout/MainLayout";

const Statistics = () => {
  return (
    <WithNavigate>
      <PageWrapper>
        <HeadMeta title={"Statistics"} />
        <div>Statistics</div>
      </PageWrapper>
    </WithNavigate>
  );
};

Statistics.getLayout = getMainLayout;
export default Statistics;
