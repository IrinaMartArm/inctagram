import { HeadMeta } from "@/components/headMeta/HeadMeta";
import { getLayout } from "@/components/layout/baseLayout/BaseLayout";

const General = () => {
  return (
    <>
      <HeadMeta title={"General"} />
      <div>General</div>
    </>
  );
};

General.getLayout = getLayout;
export default General;
