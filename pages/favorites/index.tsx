import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/mainLayout/MainLayout";

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
