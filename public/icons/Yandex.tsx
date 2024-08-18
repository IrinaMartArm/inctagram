import { forwardRef, memo } from "react";

import { IconProps } from "@/shared/assets/types/types";

export const Yandex = memo(
  forwardRef<SVGSVGElement, IconProps>(({}, ref) => {
    return (
      <svg fill={"none"} height={"36"} ref={ref} viewBox={"0 0 36 36"} width={"36"} xmlns={"http://www.w3.org/2000/svg"}>
        <g clipPath={"url(#clip0_26444_7704)"}>
          <path
            d={"M18 35C27.3888 35 35 27.3888 35 18C35 8.61116 27.3888 1 18 1C8.61116 1 1 8.61116 1 18C1 27.3888 8.61116 35 18 35Z"}
            stroke={"white"} strokeWidth={"2"} />
          <path
            d={"M9.63756 7.13086L6.45605 10.3124L15.7561 19.6131V30.6696H20.2561V19.6011L29.5448 10.3124L26.3633 7.13086L18.0001 15.4941L9.63756 7.13086Z"}
            fill={"white"} />
        </g>
        <defs>
          <clipPath id={"clip0_26444_7704"}>
            <rect fill={"white"} height={"36"} width={"36"} />
          </clipPath>
        </defs>
      </svg>


    );
  }),
);
