import { FC, HTMLProps, ReactNode, SVGProps } from "react";

export type IconProps = {
  autoSize?: boolean;
  color?: string;
  colorB?: string;
  size?: number;
  svgProps?: SVGProps<SVGSVGElement>;
} & Omit<HTMLProps<HTMLSpanElement>, "color" | "size">;

export const IconWrapper: FC<{ icon: ReactNode } & IconProps> = ({
  autoSize,
  color: colorProp,
  icon,
  size: sizeProp,
  ...restProps
}) => {
  const color = colorProp ? colorProp : "currentColor";
  const size = sizeProp ? `${sizeProp}px` : "24px";

  return (
    <span
      aria-hidden={"true"}
      role={"img"}
      style={{
        color: color,
        display: "inline-flex",
        fontSize: "inherit",
        height: size,
        width: size,
      }}
      {...restProps}
    >
      {icon}
    </span>
  );
};
