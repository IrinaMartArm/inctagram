import { forwardRef, memo } from "react";

import { IconProps } from "@/shared/assets/types/types";

export const NextArrow = memo(
  forwardRef<SVGSVGElement, IconProps>(({}, ref) => {
    return (
      <svg
        fill={"none"}
        height={36}
        ref={ref}
        width={36}
        xmlns={"http://www.w3.org/2000/svg"}
      >
        <rect fill={"#171717"} height={36} opacity={0.8} rx={2} width={36} />
        <g clipPath={"url(#a)"}>
          <path
            d={
              "M16 25a1 1 0 0 1-.77-1.64L19.71 18l-4.32-5.37a.997.997 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 16 25Z"
            }
            fill={"#fff"}
          />
        </g>
        <defs>
          <clipPath id={"a"}>
            <path d={"M6 6h24v24H6z"} fill={"#fff"} />
          </clipPath>
        </defs>
      </svg>
    );
  }),
);
