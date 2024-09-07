import React, { ChangeEvent, useRef, useState } from 'react'

import { PlusSquare_outline } from '@/public'
import { TABLET_BREAKPOINT, useIsMobile } from '@/shared/assets'
import { Button, Typography } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useAddPhotoForm } from '@/widgets/addPhotoForm/hooks'
import { AddPhotoFormContainerDesktop } from '@/widgets/addPhotoForm/ui/addPhotoFormContainerDesktop/AddPhotoFormContainerDesktop'
import AddPhotoFormContainerMobile from '@/widgets/addPhotoForm/ui/addPhotoFormContainerMobile/AddPhotoFormContainerMobile'
import { clsx } from 'clsx'

import s from './addPhotoForm.module.scss'

type Props = { isTextHidden?: boolean }
export const AddPhotoForm = ({ isTextHidden }: Props) => {
  const { imgChangeCallback, isOpen, modalState, t, toggleModal } = useAddPhotoForm()
  const [confirmOpen, setConfirmOpen] = useState<string>('')

  const isMobile = useIsMobile(TABLET_BREAKPOINT)

  const handleCloseClickOutside = () => {
    if (modalState === 'add-photo') {
      toggleModal(false)
    } else {
      setConfirmOpen('outside')
    }
  }
  const classNamesRoot = clsx(
    s.modalSpace,
    (modalState === 'filters' || modalState === 'publication') && s.withFilters
  )
  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    imgChangeCallback(e)
  }
  const handleInputClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.preventDefault()
    toggleModal(true)
    inputRef.current?.click()
  }
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <>
      {isMobile && (
        <>
          <Modal
            className={classNamesRoot}
            onOpenChange={toggleModal}
            open={isOpen}
            title={modalState === 'add-photo' ? t.addPhotoForm.title : ''}
            trigger={
              <>
                <input
                  accept={'image/png, image/jpeg, image/jpg'}
                  className={s.input}
                  id={'input-file'}
                  multiple
                  name={'file'}
                  onChange={handleImgChange}
                  ref={inputRef}
                  type={'file'}
                />
                <Button className={s.row} onClick={handleInputClick} variant={'icon'}>
                  <PlusSquare_outline />
                </Button>
              </>
            }
          >
            <AddPhotoFormContainerMobile />
          </Modal>
        </>
      )}
      {!isMobile && (
        <Modal
          className={classNamesRoot}
          handleCloseClickOutside={handleCloseClickOutside}
          onOpenChange={toggleModal}
          open={isOpen}
          title={modalState === 'add-photo' ? t.addPhotoForm.title : ''}
          trigger={
            <Button className={s.row} variant={'link'}>
              <PlusSquare_outline />
              <Typography className={s.triggerButtonText} variant={'Medium_text-14'}>
                {!isTextHidden && t.addPhotoForm.triggerButton}
              </Typography>
            </Button>
          }
        >
          <AddPhotoFormContainerDesktop
            confirmOpen={confirmOpen}
            setConfirmOpen={setConfirmOpen}
            setOpen={toggleModal}
            toggleModal={toggleModal}
          />
        </Modal>
      )}
    </>
  )
}
