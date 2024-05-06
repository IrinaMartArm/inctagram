import { FC } from "react";

import { Close } from "@/public";
import { useTranslation } from "@/shared/assets/hooks";
import { Typography } from "@/shared/components";
import { clsx } from "clsx";

import s from "./alert.module.scss";

export type AlertVariant = "error" | "success";

type Props = {
  className?: string;
  isShowClose?: boolean;
  onClick?: () => void;
  title: string;
  variant: AlertVariant;
};

export const Alert: FC<Props> = ({
  className,
  isShowClose = true,
  onClick,
  title,
  variant,
}) => {
  const { t } = useTranslation();
  const alertCN = clsx(
    s.alert,
    s[variant],
    !isShowClose && s.withoutClose,
    className,
  );

  return (
    <div className={alertCN}>
      <div className={s.text}>
        <Typography variant={"regular_text-16"}>
          <b>{t.common.error}</b> {title}
        </Typography>
      </div>
      {isShowClose && (
        <button aria-label={"close alert"} onClick={onClick}>
          <Close />
        </button>
      )}
    </div>
  );
};
