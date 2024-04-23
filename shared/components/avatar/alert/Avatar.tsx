import clsx from "clsx";
import Image from "next/image";

import s from "./avatar.module.scss";

type AlertVariant = "error" | "success";

type Props = {
  alt: string;
  className?: string;
  src: string;
  variant: "lg" | "md" | "sm";
};

export const Avatar = ({ alt, className, src, variant }: Props) => {
  const avatarCN = clsx(s[variant], className);

  return (
    <div className={avatarCN}>
      <Image
        alt={alt}
        className={s.img}
        fill
        priority
        quality={100}
        src={src}
      />
    </div>
  );
};
