import { HeadMeta } from "@/components/headMeta/HeadMeta";
import { getLayout } from "@/components/layout/baseLayout/BaseLayout";

const Profile = () => {
  return (
    <>
      <HeadMeta title={"Profile"} />
      <div>Profile</div>
    </>
  );
};

Profile.getLayout = getLayout;
export default Profile;
