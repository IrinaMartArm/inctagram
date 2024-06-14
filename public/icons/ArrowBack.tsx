import { forwardRef, memo } from "react";

import { IconProps } from "@/shared/assets/types/types";

export const ArrowBack = memo(
  forwardRef<SVGSVGElement, IconProps>(({}, ref) => {
    return (
      <svg
        fill={"none"}
        height={14}
        ref={ref}
        width={7}
        xmlns={"http://www.w3.org/2000/svg"}
      >
        <path
          d={
            "M5.83 14a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L2.29 7l4.32 5.36A1 1 0 0 1 5.83 14Z"
          }
          fill={"#fff"}
        />
      </svg>
    );
  }),
);
