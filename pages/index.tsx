import { NextPageWithLayout } from "@/pages/_app";
import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { Header } from "@/widgets/header/Header";

const Public: NextPageWithLayout = () => {
  return (
    <PageWrapper>
      <HeadMeta title={"Public"} />
      <Header />
      <main>🚀Hi everyone!🚀</main>
    </PageWrapper>
  );
};

Public.getLayout = getLayout;
export default Public;
