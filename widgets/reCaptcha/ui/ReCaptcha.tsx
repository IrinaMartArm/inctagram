import { useState } from "react";

import { CheckMark, Recaptcha } from "@/public";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { Loader, Typography } from "@/shared/components";

import s from "./reCaptcha.module.scss";

export const ReCaptcha = () => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);

  const clickHandler = () => setChecked(true);
  const isLoading = false;
  const expired = false;
  const error = false;
  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (checked) {
    content = <CheckMark />;
  } else {
    content = <button className={s.button} onClick={clickHandler}></button>;
  }

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.expired}>
            {expired && (
              <Typography variant={"error"}>{t.recaptcha.expired}</Typography>
            )}
          </div>
          <div className={s.box}>
            {content}
            <Typography variant={"small-text"}>{t.recaptcha.title}</Typography>
          </div>
          <Recaptcha />
        </div>
      </div>
      {error && <Typography variant={"error"}>{t.recaptcha.text}</Typography>}
    </div>
  );
};
