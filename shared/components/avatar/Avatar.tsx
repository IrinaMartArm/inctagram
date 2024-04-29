import noAva from "@/public/images/noAva.webp";
import clsx from "clsx";
import Image from "next/image";

import s from "./avatar.module.scss";

type AvatarSize = "lg" | "md" | "sm";

type Props = {
  alt: string;
  className?: string;
  src?: string;
  variant: AvatarSize;
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
        src={src || noAva}
      />
    </div>
  );
};
