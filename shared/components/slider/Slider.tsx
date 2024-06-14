import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { Typography } from "@/shared/components";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { clsx } from "clsx";

import s from "./slider.module.scss";

export type SliderProps = { label?: string } & ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
>;

export const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, label, ...restProps }, ref): JSX.Element => {
  const sliderClasses = clsx(s.root);

  return (
    <div className={className}>
      {label && (
        <Typography as={"label"} variant={"Bold_text-16"}>
          {label}
        </Typography>
      )}
      <div className={s.container}>
        <SliderPrimitive.Root
          className={sliderClasses}
          ref={ref}
          {...restProps}
        >
          <SliderPrimitive.Track className={s.track}>
            <SliderPrimitive.Range className={s.range} />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb aria-label={"Volume"} className={s.thumb} />
        </SliderPrimitive.Root>
      </div>
    </div>
  );
});
