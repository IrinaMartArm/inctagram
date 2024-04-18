import { NextPageWithLayout } from "@/pages/_app";
import { useMeQuery } from "@/shared/assets/api/auth/auth-api";
import { Loader, PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { Header } from "@/widgets/header/Header";

const Public: NextPageWithLayout = () => {
  // const { data, error, isLoading } = useMeQuery();
  // const isAuthenticated = !error && !isLoading;
  //
  // if (isLoading) {
  //   return <Loader />;
  // }

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
