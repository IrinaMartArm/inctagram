import { HeadMeta } from "@/components/headMeta/HeadMeta";
import { getLayout } from "@/components/layout/baseLayout/BaseLayout";

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
