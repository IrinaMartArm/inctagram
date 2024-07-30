import React, { ChangeEvent, useRef } from 'react'

import { AddPhotoBackGround } from '@/public/icons/AddPhotoBackGround'
import { Button, Typography } from '@/shared/components'
import { useAddPhotoForm } from '@/widgets/addPhotoForm/hooks'
import { ConfirmableModal } from '@/widgets/addPhotoForm/ui/confirmableModal/ConfirmableModal'
import { CroppingPhoto } from '@/widgets/addPhotoForm/ui/croppingPhoto/CroppingPhoto'
import { Filters } from '@/widgets/addPhotoForm/ui/filters/Filters'
import { Publication } from '@/widgets/addPhotoForm/ui/publication/Publication'

import s from '@/widgets/addPhotoForm/ui/addPhotoForm.module.scss'
type Props = {
  confirmOpen: string
  setConfirmOpen: (val: string) => void
  setOpen: (val: boolean) => void
  toggleModal: (val: boolean) => void
}

export const AddPhotoFormContainerDesktop = ({
  confirmOpen,
  setConfirmOpen,
  setOpen,
  toggleModal,
}: Props) => {
  const { deleteImgCallback, errorFile, imgChangeCallback, modalState, t } = useAddPhotoForm()
  const handleInputClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.preventDefault()
    inputRef.current?.click()
  }
  const inputRef = useRef<HTMLInputElement | null>(null)
  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    imgChangeCallback(e)
  }

  return (
    <>
      {modalState === 'add-photo' && (
        <div className={s.root}>
          <AddPhotoBackGround />
          <div className={s.controller}>
            <input
              accept={'image/jpeg, image/png'}
              className={s.input}
              id={'input-file'}
              name={'file'}
              onChange={handleImgChange}
              ref={inputRef}
              type={'file'}
            />
            <Button
              as={'label'}
              className={s.selectButton}
              fullWidth
              htmlFor={'input-file'}
              onClick={handleInputClick}
            >
              <Typography variant={'h3'}>{t.addPhotoForm.selectInput}</Typography>
            </Button>
            <Button fullWidth variant={'outlined'}>
              <Typography variant={'h3'}>{t.addPhotoForm.openDraft}</Typography>
            </Button>
          </div>
          {errorFile && (
            <Typography className={s.error} variant={'error'}>
              {errorFile}
            </Typography>
          )}
        </div>
      )}
      {modalState === 'cropping' && (
        <CroppingPhoto
          deleteImgCallback={deleteImgCallback}
          imgChangeCallback={imgChangeCallback}
          setConfirmOpen={setConfirmOpen}
        />
      )}
      {modalState === 'filters' && <Filters />}
      {modalState === 'publication' && <Publication />}
      {confirmOpen && (
        <ConfirmableModal
          confirmOpen={confirmOpen}
          setConfirmOpen={setConfirmOpen}
          setOpen={setOpen}
          toggleModal={toggleModal}
        />
      )}
    </>
  )
}
