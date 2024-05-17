import { MOBILE_BREAKPOINT } from "@/shared/assets/constants";
import { useIsMobile, useTranslation } from "@/shared/assets/hooks";
import { Paths } from "@/shared/assets/paths";
import { Button, PageTitle, Typography } from "@/shared/components";
import Image from "next/image";
import Link from "next/link";

import s from "./emailConfirmed.module.scss";

export const EmailConfirmedCard = () => {
  const { t } = useTranslation();
  const { confirmed, congratulations, signIn } = t.signUp;
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);

  const imageHeight = isMobile ? 230 : 300;
  const imageWidth = isMobile ? 330 : 432;

  return (
    <div className={s.wrapper}>
      <PageTitle title={congratulations} />
      <Typography className={s.confirmed} variant={"regular_text-16"}>
        {confirmed}
      </Typography>
      <div className={s.imageWithButton}>
        <Button as={Link} className={s.btn} href={Paths.LOGIN}>
          {signIn}
        </Button>
        <Image
          alt={"Congratulations!"}
          className={s.image}
          height={imageHeight}
          src={"/images/Girl.png"}
          width={imageWidth}
        />
      </div>
    </div>
  );
};
