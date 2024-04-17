import { GitHubBig, Google } from "@/public";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { Button, Card } from "@/shared/components";

import s from "@/widgets/signUp/ui/signUp.module.scss";

export const SignInCard = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <div>{t.signIn.title}</div>
      <div className={s.socials}>
        <Button icon={<Google />} variant={"link"} />
        <Button icon={<GitHubBig />} variant={"link"} />
      </div>
    </Card>
  );
};
