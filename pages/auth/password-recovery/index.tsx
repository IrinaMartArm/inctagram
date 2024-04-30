import { HeadMeta, PageWrapper } from "@/shared/components";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { PasswordRecovery } from "@/widgets";

const Password_recovery = () => {
  return (
    <PageWrapper>
      <HeadMeta title={"Password recovery"} />
      <PasswordRecovery />
    </PageWrapper>
  );
};

Password_recovery.getLayout = getLayout;
export default Password_recovery;
