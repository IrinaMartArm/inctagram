import { forwardRef, memo } from "react";

import { IconProps } from "@/shared/assets/types/types";

export const AddPhotoBackGround = memo(
  forwardRef<SVGSVGElement, IconProps>(({}, ref) => {
    return (
      <svg
        fill={"none"}
        height={228}
        ref={ref}
        width={222}
        xmlns={"http://www.w3.org/2000/svg"}
      >
        <rect fill={"#171717"} height={228} rx={2} width={222} />
        <g clipPath={"url(#a)"} fill={"#fff"}>
          <path
            d={
              "M123 96H99a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6h24a6 6 0 0 0 6-6v-24a6 6 0 0 0-6-6Zm-24 4h24a2 2 0 0 1 2 2v16.72l-6.4-5.46a5.54 5.54 0 0 0-7.04 0L97 125.4V102a2 2 0 0 1 2-2Zm24 28h-22.88l14-11.68a1.56 1.56 0 0 1 1.86 0L125 124v2a2 2 0 0 1-2 2Z"
            }
          />
          <path d={"M103 110a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"} />
        </g>
        <defs>
          <clipPath id={"a"}>
            <path d={"M87 90h48v48H87z"} fill={"#fff"} />
          </clipPath>
        </defs>
      </svg>
    );
  }),
);
