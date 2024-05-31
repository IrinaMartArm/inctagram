import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { ImageProfile } from "@/public";
import * as RadixAvatar from "@radix-ui/react-avatar";

import s from "./avatar.module.scss";

type Props = {
  size?: "large" | "small";
  src?: string;
  title: string;
} & ComponentPropsWithoutRef<typeof RadixAvatar.Root>;

export const AvatarSimple = forwardRef<
  ElementRef<typeof RadixAvatar.Root>,
  Props
>(({ className, size = "small", src, title, ...rest }, ref) => {
  return (
    <RadixAvatar.Root
      className={`${s.root} ${s[size]} ${className}`}
      ref={ref}
      {...rest}
    >
      <RadixAvatar.Image alt={"avatar"} className={s.image} src={src} />
      <RadixAvatar.Fallback className={s.fallback} delayMs={600}>
        {title}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
});
