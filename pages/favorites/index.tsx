import { WithNavigate } from "@/shared/assets/hoc/WithNavigate";
import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getMainLayout } from "@/shared/components/layout/mainLayout/MainLayout";

import s from "./favorites.module.scss";

const Favorites = () => {
  return (
    <WithNavigate>
      <PageWrapper>
        <HeadMeta title={"Favorites"} />
        <div className={s.root}>Favorites</div>
      </PageWrapper>
    </WithNavigate>
  );
};

Favorites.getLayout = getMainLayout;
export default Favorites;
