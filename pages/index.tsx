import { NextPageWithLayout } from "@/pages/_app";
import { useMeQuery } from "@/shared/assets/api/auth/auth-api";
import { Loader, PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { Header } from "@/widgets/header/Header";
import { RootState, useAppSelector } from "@/shared/assets/api/store";

const Public: NextPageWithLayout = () => {
  // const { data, error, isLoading } = useMeQuery();
  // const isAuthenticated = !error && !isLoading;
  //
  // if (isLoading) {
  //   return <Loader />;
  // }
  const isAuth = useAppSelector((state: RootState) => state.auth.isAuth);

  return (
    <PageWrapper>
      <HeadMeta title={"Public"} />
      <Header isAuth={isAuth} />
      <main>🚀Hi everyone!🚀</main>
    </PageWrapper>
  );
};

Public.getLayout = getLayout;
export default Public;
