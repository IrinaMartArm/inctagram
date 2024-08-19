import { forwardRef, memo } from "react";

import { IconProps } from "@/shared/assets/types/types";

export const Brave = memo(
  forwardRef<SVGSVGElement, IconProps>(({}, ref) => {
    return (
      <svg fill={"none"} height={"36"} ref={ref} viewBox={"0 0 36 36"} width={"36"} xmlns={"http://www.w3.org/2000/svg"}>
        <g clipPath={"url(#clip0_26444_7683)"}>
          <path
            d={"M23.52 0L26.664 3.57C26.664 3.57 29.424 2.802 30.7275 4.107C32.0295 5.412 33.1035 6.564 33.1035 6.564L32.2605 8.6355L33.333 11.706C33.333 11.706 30.177 23.676 29.808 25.1385C29.079 28.017 28.581 29.1285 26.511 30.588C24.3849 32.0758 22.2382 33.534 20.0715 34.962C19.458 35.346 18.6915 36 18.0015 36C17.3115 36 16.5465 35.346 15.9315 34.962C13.7648 33.534 11.6181 32.0759 9.49204 30.588C7.42204 29.1285 6.92404 28.017 6.19654 25.1385C5.82604 23.676 2.67004 11.706 2.67004 11.706L3.74254 8.6355L2.89954 6.564C2.89954 6.564 3.97354 5.412 5.27704 4.107C6.57904 2.802 9.33904 3.57 9.33904 3.57L12.4815 0H23.52ZM18.0015 22.404C17.7915 22.404 16.4445 22.8795 15.3645 23.439C14.2845 23.9985 13.5015 24.3945 13.251 24.552C13.0005 24.708 13.1535 25.0035 13.3815 25.1655C13.6095 25.326 16.6725 27.7005 16.971 27.9645C17.268 28.227 17.7045 28.6605 18.0015 28.6605C18.2985 28.6605 18.7365 28.2255 19.0335 27.9645C19.3305 27.702 22.3935 25.326 22.6215 25.1655C22.8495 25.0035 23.0025 24.708 22.752 24.5505C22.5015 24.3945 21.7185 23.9985 20.637 23.439C19.557 22.8795 18.2115 22.404 18.0015 22.404ZM18.0015 5.487C18.0015 5.487 17.388 5.4885 16.4685 5.796C15.549 6.1035 14.5515 6.486 14.0925 6.486C13.632 6.486 10.221 5.835 10.221 5.835C10.221 5.835 6.17854 10.728 6.17854 11.7735C6.17854 12.819 6.68704 13.095 7.19854 13.638L10.2285 16.8615C10.5165 17.166 11.1135 17.628 10.7625 18.4605C10.41 19.293 9.89254 20.3505 10.4685 21.426C11.0445 22.5 12.0315 23.217 12.6645 23.0985C13.296 22.9785 14.7825 22.2015 15.3285 21.8475C15.8745 21.492 17.6055 20.0625 17.6055 19.5165C17.6055 18.969 15.816 17.9865 15.486 17.7645C15.156 17.5395 13.647 16.677 13.6155 16.3395C13.5855 15.999 13.5975 15.9 14.0415 15.063C14.487 14.2245 15.288 13.107 15.1545 12.363C15.021 11.6205 13.7295 11.2335 12.807 10.884C11.8845 10.536 10.1085 9.8775 9.88654 9.774C9.66454 9.672 9.72154 9.5745 10.395 9.5115C11.067 9.447 12.9735 9.1935 13.833 9.4335C14.6925 9.6735 16.161 10.038 16.281 10.2315C16.3995 10.4265 16.5045 10.4325 16.3815 11.1C16.26 11.7675 15.6315 14.9715 15.57 15.54C15.51 16.11 15.39 16.485 16.002 16.626C16.6155 16.767 17.6475 17.01 18.0015 17.01C18.3555 17.01 19.3875 16.767 20.001 16.626C20.613 16.4865 20.4945 16.11 20.433 15.5415C20.373 14.9715 19.743 11.7675 19.6215 11.1C19.4985 10.4325 19.6035 10.425 19.722 10.2315C19.842 10.038 21.3105 9.6735 22.17 9.4335C23.0295 9.1935 24.9375 9.447 25.608 9.5115C26.2815 9.5745 26.3385 9.672 26.1165 9.774C25.8945 9.8775 24.1185 10.536 23.196 10.884C22.2735 11.2335 20.982 11.619 20.8485 12.363C20.7135 13.107 21.516 14.2245 21.9615 15.063C22.407 15.9 22.4175 15.999 22.3875 16.338C22.3575 16.677 20.8485 17.541 20.517 17.763C20.187 17.988 18.3975 18.969 18.3975 19.5165C18.3975 20.0625 20.1285 21.492 20.6745 21.8475C21.2205 22.2015 22.707 22.98 23.3385 23.0985C23.9715 23.217 24.9585 22.4985 25.5345 21.426C26.1105 20.352 25.593 19.293 25.242 18.4605C24.8895 17.628 25.4865 17.166 25.7745 16.8615L28.8045 13.638C29.316 13.095 29.8245 12.819 29.8245 11.7735C29.8245 10.728 25.782 5.8335 25.782 5.8335C25.782 5.8335 22.371 6.4875 21.912 6.4875C21.4515 6.4875 20.454 6.1035 19.5345 5.796C18.615 5.4885 18.0015 5.487 18.0015 5.487Z"}
            fill={"white"} />
        </g>
        <defs>
          <clipPath id={"clip0_26444_7683"}>
            <rect fill={"white"} height={"36"} width={"36"} />
          </clipPath>
        </defs>
      </svg>


    );
  }),
);
