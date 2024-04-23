import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { Button, Typography } from "@/shared/components";
import { ModalClose } from "@/shared/components/modals/ModalClose";

import s from "./signUp.module.scss";

type Props = {
  email: string;
  onOpenChange?: () => void;
};
export const EmailSent = ({ email, onOpenChange }: Props) => {
  const t = useTranslation();

  return (
    <div>
      <Typography className={s.emailSent_text} variant={"regular_text-16"}>
        We have sent a link to confirm your email to {email}
      </Typography>
      <div className={s.emailSent_btn}>
        <ModalClose>
          <Button onClick={onOpenChange}>OK</Button>
        </ModalClose>
      </div>
    </div>
  );
};
