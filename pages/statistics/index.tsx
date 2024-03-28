import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";

const Statistics = () => {
  return (
    <>
      <HeadMeta title={"Statistics"} />
      <div>Statistics</div>
    </>
  );
};

Statistics.getLayout = getLayout;
export default Statistics;
