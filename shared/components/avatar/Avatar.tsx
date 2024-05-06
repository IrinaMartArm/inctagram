import { CloseRound, ImageProfile } from "@/public";
import noAva from "@/public/images/noAva.webp";
import clsx from "clsx";
import Image from "next/image";

import s from "./avatar.module.scss";

type AvatarSize = "lg" | "md" | "sm";

type Props = {
  alt: string;
  className?: string;
  deleteAvatar?: () => void;
  isEditProfile?: boolean;
  size?: AvatarSize;
  src?: string;
};

export const Avatar = ({
  alt,
  className,
  deleteAvatar,
  isEditProfile = false,
  size = "lg",
  src,
}: Props) => {
  const avatarCN = clsx(s.avatar, s[size], className);

  const isEditWithSrc = isEditProfile && src;

  return (
    <div className={s.wrapper}>
      <div className={avatarCN}>
        {(!isEditProfile || isEditWithSrc) && (
          <Image
            alt={alt}
            className={s.img}
            fill
            priority
            quality={100}
            src={src || noAva}
          />
        )}
        {!src && isEditProfile && <ImageProfile />}
      </div>
      {src && (
        <button
          className={s.buttonDeleteAvatar}
          onClick={deleteAvatar}
          type={"button"}
        >
          <CloseRound />
        </button>
      )}
    </div>
  );
};
