import { forwardRef, memo } from "react";

import { IconProps } from "@/shared/assets/types/types";

export const PaperPlane = memo(
  forwardRef<SVGSVGElement, IconProps>(({ color }, ref) => (
    <svg
      fill={"none"}
      height={"24"}
      ref={ref}
      viewBox={"0 0 24 24"}
      width={"24"}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <g clipPath={"url(#clip0_309_5948)"}>
        <path
          d={
            "M21.0004 3.99999C20.99 3.90813 20.9699 3.81762 20.9404 3.72999V3.63999C20.8925 3.5287 20.8247 3.42705 20.7404 3.33999C20.6556 3.26026 20.5574 3.19596 20.4504 3.14999H20.3604C20.2683 3.0796 20.1628 3.02858 20.0504 2.99999H20.0004C19.901 2.98491 19.7999 2.98491 19.7004 2.99999L1.70045 8.99999C1.50038 9.06575 1.32618 9.193 1.20268 9.36358C1.07918 9.53417 1.0127 9.73939 1.0127 9.94999C1.0127 10.1606 1.07918 10.3658 1.20268 10.5364C1.32618 10.707 1.50038 10.8342 1.70045 10.9L10.2304 13.74L13.0704 22.27C13.1362 22.4701 13.2634 22.6443 13.434 22.7678C13.6046 22.8913 13.8098 22.9577 14.0204 22.9577C14.231 22.9577 14.4363 22.8913 14.6069 22.7678C14.7774 22.6443 14.9047 22.4701 14.9704 22.27L20.9704 4.26999C20.9927 4.18178 21.0028 4.09094 21.0004 3.99999ZM16.3004 6.28999L10.7304 11.86L5.16045 9.99999L16.3004 6.28999ZM14.0004 18.84L12.1404 13.27L17.7104 7.69999L14.0004 18.84Z"
          }
          fill={"white"}
        />
      </g>
      <defs>
        <clipPath id={"clip0_309_5948"}>
          <rect fill={"white"} height={"24"} width={"24"} />
        </clipPath>
      </defs>
    </svg>
  )),
);
