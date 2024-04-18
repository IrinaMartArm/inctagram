import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { Check } from "@/public";
import { Typography } from "@/shared/components";
import * as CheckboxRadix from "@radix-ui/react-checkbox";
import * as LabelRadix from "@radix-ui/react-label";
import { clsx } from "clsx";
import { AnimatePresence } from "framer-motion";

import s from "./checkBox.module.scss";

export type CheckboxProps = {
  className?: string;
  errorMessage?: string;
  label?: string;
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>;

export const CheckBox = forwardRef<
  ElementRef<typeof CheckboxRadix.Root>,
  CheckboxProps
>(
  (
    {
      checked,
      className,
      disabled,
      errorMessage,
      label,
      onCheckedChange,
      ...rest
    },
    ref,
  ) => {
    const classNames = {
      arrowColor: clsx(disabled ? "var(--color-light-700)" : ""),
      buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
      checkColor: clsx(
        disabled ? "var(--color-dark-100)" : "var(--color-light-100)",
      ),
      checkColorB: clsx(
        disabled ? "var(--color-light-900)" : "var(--color-dark-900)",
      ),
      container: clsx(s.container, className),
      label: clsx(s.label, disabled && s.disabled),
    };

    return (
      <div className={classNames.container}>
        <LabelRadix.Root asChild className={classNames.label}>
          <Typography variant={"regular_text-14"}>
            <div className={classNames.buttonWrapper}>
              <CheckboxRadix.Root
                checked={checked}
                className={s.root}
                disabled={disabled}
                onCheckedChange={onCheckedChange}
                ref={ref}
                {...rest}
              >
                <AnimatePresence initial={false}>
                  {checked && (
                    <CheckboxRadix.Indicator
                      asChild
                      className={s.indicator}
                      forceMount
                    >
                      <Check
                        color={classNames.checkColor}
                        colorB={classNames.checkColorB}
                      />
                    </CheckboxRadix.Indicator>
                  )}
                </AnimatePresence>
              </CheckboxRadix.Root>
            </div>
            {label}
          </Typography>
        </LabelRadix.Root>
        <Typography className={s.errorMessage} variant={"small-text"}>
          {errorMessage}
        </Typography>
      </div>
    );
  },
);

CheckBox.displayName = "CheckBox";
