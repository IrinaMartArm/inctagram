import { HTMLProps, LegacyRef } from "react";

export type Nullable<T> = T | null;

export type IconProps = {
  color?: string;
  colorB?: string;
  ref?: LegacyRef<SVGSVGElement>;
  size?: number;
} & Omit<HTMLProps<HTMLSpanElement>, "color" | "size">;
