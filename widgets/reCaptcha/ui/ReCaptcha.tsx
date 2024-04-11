import { useState } from "react";

import { CheckMark, Recaptcha } from "@/public";
import { Loader, Typography } from "@/shared/components";

import s from "./reCaptcha.module.scss";

export const ReCaptcha = () => {
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
              <Typography variant={"error"}>
                Verification expired. Check the checkbox again.
              </Typography>
            )}
          </div>
          <div className={s.box}>
            {content}
            <Typography variant={"small-text"}>I’m not a robot</Typography>
          </div>
          <Recaptcha />
        </div>
      </div>
      {error && (
        <Typography variant={"error"}>
          {"Please verify that you are not a robot"}
        </Typography>
      )}
    </div>
  );
};
