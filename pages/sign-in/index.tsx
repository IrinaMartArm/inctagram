import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/mainLayout/MainLayout";

const SignIn = () => {
  return (
    <>
      <HeadMeta title={"Sign In"} />
      <div>SignIn</div>
    </>
  );
};

SignIn.getLayout = getLayout;
export default SignIn;
