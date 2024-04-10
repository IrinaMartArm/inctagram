import { useForm } from "react-hook-form";

import { GitHubBig, Google } from "@/public";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import {
  Button,
  ControlledCheckBox,
  Input,
  Typography,
} from "@/shared/components";
import { Card } from "@/shared/components/card";
import { Trans } from "@/shared/components/trans/Trans";
import Link from "next/link";

import s from "./signUp.module.scss";

export const SignUpCard = () => {
  const { t } = useTranslation();
  const { control } = useForm();

  return (
    <Card as={"form"}>
      <Typography variant={"h1"}>{t.signup.title}</Typography>
      <div className={s.socials}>
        <Google />
        <GitHubBig />
      </div>
      <Input label={"Username"} placeholder={"Username"} type={"text"} />
      <Input label={"Email"} placeholder={"Email"} type={"email"} />
      <Input label={"Password"} placeholder={"Password"} type={"password"} />
      <Input
        label={"Password confirmation"}
        placeholder={"Password confirmation"}
        type={"password"}
      />
      <div className={s.policy}>
        <ControlledCheckBox control={control} name={"agree"} />
        <Trans
          tags={{
            1: () => (
              <Link href={"./terms-of-service"}>
                <Typography variant={"small_link"}>{t.signup["1"]}</Typography>
              </Link>
            ),
            2: () => (
              <Link href={"./privacy-policy"}>
                <Typography variant={"small_link"}>{t.signup["2"]}</Typography>
              </Link>
            ),
          }}
          text={t.signup.agree}
        />
      </div>
      <div className={s.button}>
        <Button fullWidth>{t.signup.title}</Button>
      </div>
      <Typography variant={"regular_text-16"}>{t.signup.question}</Typography>
      <Button variant={"link"}>{t.signup.signIn}</Button>
    </Card>
  );
};
