import { HeadMeta } from "@/components/headMeta/HeadMeta";
import { Header } from "@/components/header/Header";
import { getLayout } from "@/components/layout/baseLayout/BaseLayout";

function Home() {
  return (
    <>
      <HeadMeta title={"Home"} />
      <Header />
      <main>🚀Hi everyone!🚀</main>
    </>
  );
}

Home.getLayout = getLayout;
export default Home;
