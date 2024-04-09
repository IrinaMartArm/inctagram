import { WithNavigate } from "@/shared/assets/hoc/WithNavigate";
import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getMainLayout } from "@/shared/components/layout/mainLayout/MainLayout";

const Search = () => {
  return (
    <WithNavigate>
      <PageWrapper>
        <HeadMeta title={"Search"} />
        <div>Search</div>
      </PageWrapper>
    </WithNavigate>
  );
};

Search.getLayout = getMainLayout;
export default Search;
