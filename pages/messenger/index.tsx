import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";

const Messenger = () => {
  return (
    <>
      <HeadMeta title={"Messenger"} />
      <div>Messenger</div>
    </>
  );
};

Messenger.getLayout = getLayout;
export default Messenger;