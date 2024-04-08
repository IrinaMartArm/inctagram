import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/mainLayout/MainLayout";
import { SignUpCard } from "@/widgets/signUp/ui/SignUp";

const SignUp = () => {
  const { t } = useTranslation();

  return (
    <>
      <HeadMeta title={"Sign Up"} />
      <div>{t.signup.title}</div>
      <SignUpCard />
    </>
  );
};

SignUp.getLayout = getLayout;
export default SignUp;
