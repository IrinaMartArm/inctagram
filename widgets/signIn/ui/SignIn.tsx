import { GitHubBig, Google } from "@/public";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { Card } from "@/shared/components";

export const SignInCard = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <div>{t.signIn.title}</div>
      <div>
        <Google />
        <GitHubBig />
      </div>
    </Card>
  );
};
