import {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
  forwardRef,
} from "react";

import { Close } from "@/public";
import { Button, Typography } from "@/shared/components";
import { ModalClose } from "@/shared/components/modals/ModalClose";
import { modalAnimations } from "@/shared/components/modals/modalsWindowAnimations";
import * as RadixModal from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";

import s from "./Modals.module.scss";

export type Props = {
  className?: string;
  handleCloseClickOutside?: () => void;
  title?: string;
  trigger?: ReactNode;
} & ComponentPropsWithoutRef<typeof RadixModal.Root>;

export const Modal = forwardRef<ElementRef<typeof RadixModal.Root>, Props>(
  (props, ref) => {
    const {
      children,
      className,
      handleCloseClickOutside,
      onOpenChange,
      open,
      title,
      trigger,
      ...rest
    } = props;

    return (
      <RadixModal.Root {...rest} onOpenChange={onOpenChange} open={open}>
        {trigger && <RadixModal.Trigger asChild>{trigger}</RadixModal.Trigger>}
        <AnimatePresence>
          <RadixModal.Portal>
            <motion.div {...modalAnimations.overlay}>
              <RadixModal.Overlay className={s.overlay} />
            </motion.div>
            <div className={`${s.root} ${className}`} {...rest}>
              <RadixModal.Content
                asChild
                onInteractOutside={(event) => {
                  if (handleCloseClickOutside) {
                    event.preventDefault();
                    handleCloseClickOutside();
                  }
                }}
                ref={ref}
              >
                <motion.div {...modalAnimations.window}>
                  {title && (
                    <div className={s.title}>
                      <Typography as={"h1"} variant={"h1"}>
                        {title}
                      </Typography>
                      <ModalClose>
                        <Button
                          icon={<Close />}
                          onClick={onOpenChange}
                          variant={"icon"}
                        />
                      </ModalClose>
                    </div>
                  )}
                  {children}
                </motion.div>
              </RadixModal.Content>
            </div>
          </RadixModal.Portal>
        </AnimatePresence>
      </RadixModal.Root>
    );
  },
);
