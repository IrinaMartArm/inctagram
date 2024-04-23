import { Info } from "@/features/info/Info";
import { Button, PageWrapper, Typography } from "@/shared/components";
import Link from "next/link";

import s from "./profile.module.scss";

const following = 746;
const followers = 345;
const publications = 465;

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
          <div className={s.second_row}>
            <Info number={following} title={"Following"} />
            <Info number={followers} title={"Followers"} />
            <Info number={publications} title={"Publications"} />
          </div>
          <div className={s.third_row}>
            <Typography variant={"regular_text-16"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco
              <Typography as={Link} href={""} variant={"regular_link"}>
                laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
            </Typography>
          </div>
        </div>
      </div>
      <div></div>
    </PageWrapper>
  );
};
