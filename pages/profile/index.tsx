import { WithNavigate } from "@/shared/assets/hoc/WithNavigate";
import { PageWrapper } from "@/shared/components";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getMainLayout } from "@/shared/components/layout/mainLayout/MainLayout";

const Profile = () => {
  return (
    <WithNavigate>
      <PageWrapper>
        <HeadMeta title={"Profile"} />
        <div>Profile</div>
      </PageWrapper>
    </WithNavigate>
  );
};

Profile.getLayout = getMainLayout;
export default Profile;
