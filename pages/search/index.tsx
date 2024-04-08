import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/mainLayout/MainLayout";

const Search = () => {
  return (
    <>
      <HeadMeta title={"Search"} />
      <div>Search</div>
    </>
  );
};

Search.getLayout = getLayout;
export default Search;
