import { Info } from "@/features/info/Info";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { Button, PageWrapper, Typography } from "@/shared/components";
import Link from "next/link";

import s from "./profile.module.scss";

const followingN = 746;
const followersN = 345;
const publicationsN = 465;

export const MyProfile = () => {
  const { t } = useTranslation();
  const { followers, following, publications, settingsBtn } = t.profile;

  return (
    <PageWrapper>
      <div className={s.info_wrapper}>
        <div className={s.avatar}>{/*<Avatar />*/}</div>
        <div className={s.info_block}>
          <div className={s.first_row}>
            <Typography variant={"h1"}>URLProfiele</Typography>
            <Button
              as={Link}
              href={"./profile-settings/general"}
              variant={"secondary"}
            >
              {settingsBtn}
            </Button>
          </div>
          <div className={s.second_row}>
            <Info number={followingN} title={following} />
            <Info number={followersN} title={followers} />
            <Info number={publicationsN} title={publications} />
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
