import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getMainLayout } from "@/shared/components/layout/mainLayout/MainLayout";

const Profile = () => {
  return (
    <PageWrapper>
      <HeadMeta title={"Profile"} />
      <div>Profile</div>
    </PageWrapper>
  );
};

Profile.getLayout = getMainLayout;
export default Profile;
