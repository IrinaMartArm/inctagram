import { HeadMeta, PageWrapper } from "@/shared/components";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { NewPasswordCard } from "@/widgets";

const NewPassword = () => {
  return (
    <PageWrapper>
      <HeadMeta title={"Password recovery"} />
      <NewPasswordCard />
    </PageWrapper>
  );
};

NewPassword.getLayout = getLayout;
export default NewPassword;
