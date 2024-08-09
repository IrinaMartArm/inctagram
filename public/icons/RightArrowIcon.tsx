import {forwardRef, memo} from "react";

import {IconProps} from "@/shared/assets";


export const RightArrowIcon = memo(
    forwardRef<SVGSVGElement, IconProps>(({}, ref) => {
        return (
            <svg
                fill={"none"}
                height={16}
                ref={ref}
                width={16}
                xmlns={"http://www.w3.org/2000/svg"}
            >
                <path
                    d={"M6.667 12.666a.666.666 0 0 1-.513-1.093L9.14 8 6.26 4.42a.667.667 0 0 1 .1-.94.667.667 0 0 1 .974.1l3.22 4a.666.666 0 0 1 0 .847l-3.334 4a.667.667 0 0 1-.553.24Z"}
                    fill={"#fff"}
                />
            </svg>
        );
    }),
);