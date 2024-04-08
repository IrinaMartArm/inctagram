import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/mainLayout/MainLayout";
import { Trans } from "@/shared/components/trans/Trans";

const General = () => {
  return (
    <>
      <HeadMeta title={"General"} />
      <div>General</div>
    </>
  );
};

General.getLayout = getLayout;
export default General;
