import { Button, PageWrapper, Typography } from "@/shared/components";

import s from "./profile.module.scss";

export const MyProfile = () => {
  return (
    <PageWrapper>
      <div className={s.info_wrapper}>
        {/*<Avatar />*/}
        <div className={s.info_block}>
          <div className={s.first_row}>
            <Typography variant={"h1"}>URLProfiele</Typography>
            <Button variant={"secondary"}>Profile Settings</Button>
          </div>
          <div className={s.second_row}></div>
          <div className={s.third_row}></div>
        </div>
      </div>
      <div></div>
    </PageWrapper>
  );
};
