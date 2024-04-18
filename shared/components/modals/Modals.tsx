import {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
  forwardRef,
} from "react";

import { Close } from "@/public";
import { Button, Card, Typography } from "@/shared/components";
import { ModalClose } from "@/shared/components/modals/ModalClose";
import * as RadixModal from "@radix-ui/react-dialog";

import s from "./Modals.module.scss";

export type Props = {
  className?: string;
  title?: string;
  trigger?: ReactNode;
} & ComponentPropsWithoutRef<typeof RadixModal.Root>;

export const Modal = forwardRef<ElementRef<typeof RadixModal.Root>, Props>(
  (props, ref) => {
    const { children, className, title, trigger, ...rest } = props;

    return (
      <RadixModal.Root {...rest}>
        <RadixModal.Trigger asChild>{trigger}</RadixModal.Trigger>
        <RadixModal.Portal>
          <RadixModal.Overlay className={s.overlay} />
          <RadixModal.Content
            asChild
            className={`${s.main} ${className}`}
            ref={ref}
          >
            <div className={s.emailSent_wrapper}>
              {title && (
                <div className={s.title}>
                  <Typography as={"h1"} variant={"h2"}>
                    {title}
                  </Typography>
                  <ModalClose>
                    <Button icon={<Close />} variant={"icon"} />
                  </ModalClose>
                </div>
              )}
              {children}
            </div>
          </RadixModal.Content>
        </RadixModal.Portal>
      </RadixModal.Root>
    );
  },
);
