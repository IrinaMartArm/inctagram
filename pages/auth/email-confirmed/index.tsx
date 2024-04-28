import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { EmailConfirmedCard } from "@/widgets";

const EmailConfirmed = () => {
  return <EmailConfirmedCard />;
};

EmailConfirmed.getLayout = getLayout;
export default EmailConfirmed;
