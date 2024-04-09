import { WithNavigate } from "@/shared/assets/hoc/WithNavigate";
import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getMainLayout } from "@/shared/components/layout/mainLayout/MainLayout";

const Posts = () => {
  return (
    <WithNavigate>
      <PageWrapper>
        <HeadMeta title={"Posts"} />
        <div>Posts👻</div>
      </PageWrapper>
    </WithNavigate>
  );
};

Posts.getLayout = getMainLayout;
export default Posts;
