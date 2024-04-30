import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getMainLayout } from "@/shared/components/layout/mainLayout/MainLayout";
import { General } from "@/widgets/general";

const GeneralInformation = () => {
  return (
    <>
      <HeadMeta title={"General"} />
      <General />
    </>
  );
};

GeneralInformation.getLayout = getMainLayout;
export default GeneralInformation;
