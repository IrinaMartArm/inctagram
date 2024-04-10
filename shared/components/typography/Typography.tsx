import { ComponentProps, ElementType, ReactNode } from "react";

import { clsx } from "clsx";

import s from "./typography.module.scss";

type PropsType<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  variant: TypographyVariantTypes;
} & ComponentProps<T>;

export const Typography = <T extends ElementType = "div">({
  as: Component = "div",
  children,
  className,
  variant,
  ...rest
}: PropsType<T> & Omit<ComponentProps<T>, keyof PropsType<T>>) => {
  const classNames = {
    style: clsx(className, `${s[variant]}`),
  };

  return (
    <Component className={classNames.style} {...rest}>
      {children}
    </Component>
  );
};
export type TypographyVariantTypes =
  | "Bold_text-16"
  | "Large"
  | "Medium_text-14"
  | "Semi-bold_small-text"
  | "bold_text-14"
  | "dashed"
  | "error"
  | "h1"
  | "h2"
  | "h3"
  | "regular_link"
  | "regular_text-14"
  | "regular_text-16"
  | "small_link"
  | "small-text";
