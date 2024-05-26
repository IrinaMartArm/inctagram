import { Info } from "@/features";
import { Paths } from "@/shared/assets";
import { useTranslationPages } from "@/shared/assets/hooks";
import { Button, Typography } from "@/shared/components";
import Link from "next/link";
import { useRouter } from "next/router";

import s from "./profile.module.scss";

const followingN = 746;
const followersN = 345;
const publicationsN = 465;

export const MyProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  // const { data: profile } = useProfileInformationQuery();
  const { t } = useTranslationPages();

  return (
    <>
      <div className={s.info_wrapper}>
        <div className={s.avatar}>{/*<Avatar />*/}</div>
        <div className={s.info_block}>
          <div className={s.first_row}>
            <Typography variant={"h1"}>URLProfiele</Typography>
            <Button
              as={Link}
              href={Paths.PROFILE_GENERAL}
              variant={"secondary"}
            >
              {t.settingsBtn}
            </Button>
          </div>
          <div className={s.second_row}>
            <Info number={followingN} title={t.following} />
            <Info number={followersN} title={t.followers} />
            <Info number={publicationsN} title={t.publications} />
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
      <div className={s.posts}></div>
    </>
  );
};
