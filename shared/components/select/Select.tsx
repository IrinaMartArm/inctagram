import { ElementRef, Ref, forwardRef, useState } from "react";

import { Typography } from "@/shared/components";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as SelectRadix from "@radix-ui/react-select";
import { clsx } from "clsx";
import Image from "next/image";

import s from "./select.module.scss";

type ItemsType = {
  img?: string;
  title: string;
  value: string;
};

type SelectType = {
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  isPagination?: boolean;
  items: ItemsType[];
  label?: string;
  name?: string;
  onChange: (key: string, value: string) => void;
  value?: string;
};
export const Select = forwardRef<
  ElementRef<typeof SelectRadix.Root>,
  SelectType
>(
  (
    {
      className,
      defaultValue,
      isPagination,
      items,
      label,
      name,
      onChange,
      value,
      ...rest
    }: SelectType,
    ref: Ref<HTMLSelectElement>,
  ) => {
    const classNames = {
      Container: clsx(s.Container, className),
      SelectTrigger: clsx(
        s.SelectTrigger,
        isPagination && s.pagination,
        className,
      ),
      selectItem: clsx(s.SelectItem, isPagination && s.pagination, className),
    };

    const [open, setOpen] = useState(false);
    const toggle = () => {
      setOpen(!open);
    };
    const ValueChangeHandler = (newValue: string) =>
      onChange("itemsPerPage", newValue ?? "10");

    return (
      <SelectRadix.Root
        defaultValue={!value ? defaultValue : undefined}
        name={name}
        onOpenChange={toggle}
        onValueChange={ValueChangeHandler}
        value={value}
        {...rest}
      >
        <div className={classNames.Container}>
          {label && (
            <Typography className={s.label} variant={"body2"}>
              {label}
            </Typography>
          )}
          <SelectRadix.Trigger
            aria-label={label}
            className={classNames.SelectTrigger}
          >
            <SelectRadix.Value ref={ref} />
            {open ? (
              <SelectRadix.Icon className={s.SelectIcon}>
                <ChevronUpIcon />
              </SelectRadix.Icon>
            ) : (
              <SelectRadix.Icon className={s.SelectIcon}>
                <ChevronDownIcon />
              </SelectRadix.Icon>
            )}
          </SelectRadix.Trigger>
          <SelectRadix.Portal>
            <SelectRadix.Content
              className={s.SelectContent}
              position={"popper"}
              sideOffset={-2}
            >
              <SelectRadix.Viewport className={s.SelectViewport}>
                <SelectRadix.Group>
                  {items.map((el, index) => (
                    <SelectRadix.Item
                      className={classNames.selectItem}
                      key={index}
                      value={el.value}
                    >
                      <SelectRadix.ItemText asChild>
                        <div className={s.itemk}>
                          {el.img && (
                            <Image
                              alt={el.img}
                              height={20}
                              src={el.img}
                              width={20}
                            />
                          )}
                          <div>{el.title}</div>
                        </div>
                      </SelectRadix.ItemText>
                    </SelectRadix.Item>
                  ))}
                </SelectRadix.Group>
              </SelectRadix.Viewport>
            </SelectRadix.Content>
          </SelectRadix.Portal>
        </div>
      </SelectRadix.Root>
    );
  },
);
