import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { Button, Typography } from "@/shared/components";
import { ModalClose } from "@/shared/components/modals/ModalClose";

import s from "./signUp.module.scss";

type Props = {
  email: string;
  onOpenChange?: () => void;
};
export const EmailSent = ({ email, onOpenChange }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={s.emailSent_wrapper}>
      <Typography className={s.emailSent_text} variant={"regular_text-16"}>
        {t.signUp.haveSent}{" "}
      </Typography>
      <br />
      <Typography className={s.emailSent_text} variant={"Bold_text-16"}>
        {email ?? ""}
      </Typography>
      <div className={s.emailSent_btn}>
        <ModalClose>
          <Button onClick={onOpenChange}>OK</Button>
        </ModalClose>
      </div>
    </div>
  );
};
