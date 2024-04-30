import { FC } from "react";

import { Close } from "@/public";
import { Typography } from "@/shared/components";
import { clsx } from "clsx";

import s from "./alert.module.scss";

export type AlertVariant = "error" | "success";

type Props = {
  className?: string;
  onClick?: () => void;
  title: string;
  variant: AlertVariant;
};

export const Alert: FC<Props> = ({ className, onClick, title, variant }) => {
  const alertCN = clsx(s.alert, s[variant], className);

  return (
    <div className={alertCN}>
      <div className={s.text}>
        {variant === "error" && (
          <Typography variant={"Bold_text-16"}>Error!</Typography>
        )}
        <Typography variant={"regular_text-16"}>{title}</Typography>
      </div>
      <button aria-label={"close alert"} onClick={onClick}>
        <Close />
      </button>
    </div>
  );
};
