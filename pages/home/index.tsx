import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getMainLayout } from "@/shared/components/layout/mainLayout/MainLayout";
import { Post } from "@/widgets/profile/post/ui/Post";

const Home = () => {
  return (
    <PageWrapper>
      <HeadMeta title={"Posts"} />
      <div>Home🌼</div>
      <Post />
    </PageWrapper>
  );
};

Home.getLayout = getMainLayout;
export default Home;
