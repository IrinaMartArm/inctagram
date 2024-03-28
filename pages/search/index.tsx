import { HeadMeta } from "@/components/headMeta/HeadMeta";
import { getLayout } from "@/components/layout/baseLayout/BaseLayout";

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
