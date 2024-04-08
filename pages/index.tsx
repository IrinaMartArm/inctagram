import { NextPageWithLayout } from "@/pages/_app";
import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getMainLayout } from "@/shared/components/layout/mainLayout/MainLayout";
import { Header } from "@/widgets/header/Header";

const Home: NextPageWithLayout = () => {
  return (
    <PageWrapper>
      <HeadMeta title={"Home"} />
      <Header />
      <main>🚀Hi everyone!🚀</main>
    </PageWrapper>
  );
};

Home.getLayout = getMainLayout;
export default Home;
