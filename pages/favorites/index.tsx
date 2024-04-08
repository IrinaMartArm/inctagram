import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getMainLayout } from "@/shared/components/layout/mainLayout/MainLayout";

import s from "./favorites.module.scss";

const Favorites = () => {
  return (
    <>
      <HeadMeta title={"Favorites"} />
      <div className={s.root}>Favorites</div>
    </>
  );
};

Favorites.getLayout = getMainLayout;
export default Favorites;
