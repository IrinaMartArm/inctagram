import { HeadMeta } from "@/components/headMeta/HeadMeta";
import { getLayout } from "@/components/layout/baseLayout/BaseLayout";

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
