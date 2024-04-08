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
  | "body1"
  | "body2"
  | "caption"
  | "error"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "link1"
  | "link2"
  | "overline"
  | "subtitle1"
  | "subtitle2";
