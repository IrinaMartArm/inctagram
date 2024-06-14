import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getMainLayout } from "@/shared/components/layout/mainLayout/MainLayout";

const Create = () => {
  return (
    <PageWrapper>
      <HeadMeta title={"Search"} />
      <div>Create</div>
    </PageWrapper>
  );
};

Create.getLayout = getMainLayout;
export default Create;
