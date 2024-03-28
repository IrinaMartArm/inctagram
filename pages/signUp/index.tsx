import { HeadMeta } from "@/components/headMeta/HeadMeta";
import { getLayout } from "@/components/layout/baseLayout/BaseLayout";

const SignUp = () => {
  return (
    <>
      <HeadMeta title={"Sign Up"} />
      <div>SignUp</div>
    </>
  );
};

SignUp.getLayout = getLayout;
export default SignUp;
