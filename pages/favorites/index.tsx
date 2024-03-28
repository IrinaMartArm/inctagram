import { HeadMeta } from "@/components/headMeta/HeadMeta";
import { getLayout } from "@/components/layout/baseLayout/BaseLayout";

import s from "./favorites.module.scss";

const Favorites = () => {
  return (
    <>
      <HeadMeta title={"Favorites"} />
      <div className={s.root}>Favorites</div>
    </>
  );
};

Favorites.getLayout = getLayout;
export default Favorites;
