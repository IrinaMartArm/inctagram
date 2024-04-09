import { GitHubBig, Google } from "@/public";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { Card } from "@/shared/components/card";
import { Trans } from "@/shared/components/trans/Trans";

export const SignUpCard = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <div>{t.signup.title}</div>
      <div>
        <Google />
        <GitHubBig />
      </div>
      <Trans
        tags={{
          1: () => <button style={{ color: "red" }}>{t.signup["1"]}</button>,
          2: () => <button style={{ color: "red" }}>{t.signup["2"]}</button>,
        }}
        text={t.signup.agree}
      />
    </Card>
  );
};
