import { HeadMeta } from "@/components/headMeta/HeadMeta";
import { getLayout } from "@/components/layout/baseLayout/BaseLayout";

const Posts = () => {
  return (
    <>
      <HeadMeta title={"Posts"} />
      <div>Posts👻</div>
    </>
  );
};

Posts.getLayout = getLayout;
export default Posts;
