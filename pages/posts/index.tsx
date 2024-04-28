import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getMainLayout } from "@/shared/components/layout/mainLayout/MainLayout";

const Posts = () => {
  return (
    <PageWrapper>
      <HeadMeta title={"Posts"} />
      <div>Posts👻</div>
    </PageWrapper>
  );
};

Posts.getLayout = getMainLayout;
export default Posts;
