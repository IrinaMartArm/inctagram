import { HeadMeta, getMainLayout } from "@/shared/components";
import { General } from "@/widgets/profile/general";

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
