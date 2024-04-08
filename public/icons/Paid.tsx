import { forwardRef, memo } from "react";

import { IconProps } from "@/shared/assets/types/types";

export const Paid = memo(
  forwardRef<SVGSVGElement, IconProps>(({}, ref) => {
    return (
      <svg
        fill={"none"}
        height={"24"}
        ref={ref}
        viewBox={"0 0 24 24"}
        width={"24"}
        xmlns={"http://www.w3.org/2000/svg"}
      >
        <path
          d={
            "M11.3654 0.521155C11.7342 0.218242 12.2658 0.218242 12.6346 0.521155L14.7751 2.27886C14.9697 2.43869 15.2175 2.5192 15.4689 2.50429L18.2337 2.34039C18.7101 2.31215 19.1402 2.62457 19.2605 3.08645L19.959 5.76657C20.0225 6.01028 20.1757 6.22105 20.3878 6.35676L22.7209 7.84927C23.123 8.10648 23.2872 8.61199 23.1131 9.05641L22.1029 11.6352C22.011 11.8697 22.011 12.1303 22.1029 12.3648L23.1131 14.9436C23.2872 15.388 23.123 15.8935 22.7209 16.1507L20.3878 17.6432C20.1757 17.779 20.0225 17.9897 19.959 18.2334L19.2605 20.9136C19.1402 21.3754 18.7101 21.6879 18.2337 21.6596L15.4689 21.4957C15.2175 21.4808 14.9697 21.5613 14.7751 21.7211L12.6346 23.4788C12.2658 23.7818 11.7342 23.7818 11.3654 23.4788L9.22494 21.7211C9.03031 21.5613 8.78254 21.4808 8.53113 21.4957L5.76633 21.6596C5.28986 21.6879 4.85985 21.3754 4.73948 20.9136L4.04099 18.2334C3.97747 17.9897 3.82434 17.779 3.61219 17.6432L1.27908 16.1507C0.877008 15.8935 0.712758 15.388 0.886858 14.9436L1.89711 12.3648C1.98897 12.1303 1.98897 11.8697 1.89711 11.6352L0.886858 9.05641C0.712757 8.61199 0.877008 8.10648 1.27908 7.84927L3.61219 6.35676C3.82434 6.22105 3.97747 6.01028 4.04099 5.76657L4.73948 3.08645C4.85985 2.62457 5.28986 2.31215 5.76633 2.34039L8.53113 2.50429C8.78254 2.5192 9.03031 2.43869 9.22494 2.27886L11.3654 0.521155Z"
          }
          fill={"#397DF6"}
        />
        <g clipPath={"url(#clip0_4700_12135)"}>
          <path
            d={
              "M15.08 8.14001C15.011 8.08537 14.9318 8.04494 14.8471 8.02105C14.7624 7.99716 14.6738 7.99029 14.5864 8.00083C14.499 8.01136 14.4146 8.0391 14.3379 8.08244C14.2613 8.12578 14.1941 8.18387 14.14 8.25334L9.47333 14.2533L7.18667 11.4667C7.13303 11.3953 7.0656 11.3354 6.98837 11.2906C6.91114 11.2457 6.82569 11.2169 6.73709 11.2057C6.64849 11.1945 6.55855 11.2012 6.47261 11.2255C6.38667 11.2497 6.30647 11.291 6.23678 11.3468C6.16709 11.4027 6.10933 11.472 6.06693 11.5505C6.02453 11.6291 5.99835 11.7154 5.98994 11.8044C5.98154 11.8933 5.99108 11.9829 6.018 12.0681C6.04493 12.1532 6.08868 12.2321 6.14667 12.3L8.92667 15.7533C8.98941 15.8307 9.06869 15.893 9.15868 15.9357C9.24866 15.9784 9.34707 16.0003 9.44667 16C9.55239 16.0047 9.65771 15.9842 9.75393 15.9402C9.85015 15.8961 9.9345 15.8298 10 15.7467L15.22 9.08001C15.2732 9.00936 15.3118 8.92883 15.3336 8.8431C15.3554 8.75738 15.3599 8.66817 15.3469 8.58069C15.3339 8.4932 15.3036 8.40918 15.2577 8.33352C15.2119 8.25787 15.1515 8.19209 15.08 8.14001Z"
            }
            fill={"white"}
          />
          <path
            d={
              "M18.4133 8.14001C18.3443 8.08537 18.2652 8.04494 18.1804 8.02105C18.0957 7.99716 18.0071 7.99029 17.9197 8.00083C17.8323 8.01136 17.7479 8.0391 17.6713 8.08244C17.5947 8.12578 17.5274 8.18387 17.4733 8.25334L12.8067 14.2533L12.4 13.7533L11.56 14.8333L12.2933 15.7467C12.3561 15.824 12.4354 15.8863 12.5253 15.929C12.6153 15.9717 12.7137 15.9937 12.8133 15.9933C12.9135 15.9929 13.0122 15.9699 13.1022 15.926C13.1923 15.8822 13.2712 15.8186 13.3333 15.74L18.5533 9.07334C18.6055 9.0029 18.6433 8.92286 18.6645 8.8378C18.6857 8.75274 18.6899 8.66433 18.6769 8.57764C18.6639 8.49095 18.6339 8.40767 18.5887 8.33258C18.5435 8.25748 18.4839 8.19204 18.4133 8.14001Z"
            }
            fill={"white"}
          />
          <path
            d={
              "M9.80667 12.7067L10.6667 11.6267L10.5333 11.4667C10.4807 11.3938 10.4139 11.3322 10.3368 11.2858C10.2598 11.2394 10.1742 11.2091 10.0851 11.1966C9.99605 11.1842 9.90539 11.1898 9.81858 11.2133C9.73177 11.2368 9.65062 11.2777 9.58 11.3333C9.51152 11.3884 9.45458 11.4564 9.41246 11.5335C9.37035 11.6105 9.34388 11.6952 9.33459 11.7826C9.3253 11.8699 9.33336 11.9582 9.35831 12.0425C9.38327 12.1267 9.42462 12.2051 9.48 12.2733L9.80667 12.7067Z"
            }
            fill={"white"}
          />
        </g>
        <defs>
          <clipPath id={"clip0_4700_12135"}>
            <rect
              fill={"white"}
              height={"16"}
              transform={"translate(4 4)"}
              width={"16"}
            />
          </clipPath>
        </defs>
      </svg>
    );
  }),
);