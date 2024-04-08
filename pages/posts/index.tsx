import { WithNavigate } from "@/shared/assets/hoc/WithNavigate";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import {
  getExtraLayout,
  getLayout,
} from "@/shared/components/layout/mainLayout/MainLayout";

const Posts = () => {
  return (
    <WithNavigate>
      <HeadMeta title={"Posts"} />
      <div>Posts👻</div>
    </WithNavigate>
  );
};

Posts.getLayout = getExtraLayout;
export default Posts;
