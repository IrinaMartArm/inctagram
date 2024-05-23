import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { EmailConfirmedCard } from "@/widgets/auth/email-confirmed";

const EmailConfirmed = () => {
  return <EmailConfirmedCard />;
};

EmailConfirmed.getLayout = getLayout;
export default EmailConfirmed;
