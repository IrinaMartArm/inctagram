import { forwardRef, memo } from "react";

import { IconProps } from "@/shared/assets/types/types";

export const PrevArrow = memo(
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
              "M19.83 25a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 1 1 1.54 1.28L16.29 18l4.32 5.36a1 1 0 0 1-.78 1.64Z"
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
