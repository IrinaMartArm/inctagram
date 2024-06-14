import { HTMLProps, LegacyRef } from "react";

export type Nullable<T> = T | null;

export type IconProps = {
  color?: string;
  ref?: LegacyRef<SVGSVGElement>;
  size?: number;
} & Omit<HTMLProps<HTMLSpanElement>, "color" | "size">;

export type CropArg = {
  height: number;
  width: number;
  x: number;
  y: number;
};
