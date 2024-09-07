import React, { ChangeEvent, useRef } from 'react'

import { ClosingCross } from '@/public'
import { Plus } from '@/public/icons/Plus'
import { Button } from '@/shared/components'
import { useAddPhotoForm } from '@/widgets/addPhotoForm/hooks'

import s from './addPhotosMenu.module.scss'

type Props = {
  deleteImgCallback: (ind: number) => void
  images: string[] | undefined
}

export const AddPhotosMenu = ({ deleteImgCallback, images }: Props) => {
  const { imgChangeCallback } = useAddPhotoForm()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    imgChangeCallback(e)
  }
  const handleInputClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.preventDefault()
    inputRef.current?.click()
  }
  const photoLength = images?.length ? images.length : 1
  const photo = images?.map((el, index) => {
    return (
      <div className={s.photoContainer} key={index}>
        <Button
          className={s.closingCross}
          onClick={() => deleteImgCallback(index)}
          variant={'icon'}
        >
          <ClosingCross />
        </Button>
        <img alt={''} className={s.imgPhotosMenu} src={el} />
      </div>
    )
  })

  return (
    <div className={s.container}>
      {photo}
      <input
        accept={'image/jpeg, image/png'}
        className={s.input}
        id={'input-file'}
        name={'file'}
        onChange={handleImgChange}
        ref={inputRef}
        type={'file'}
      />
      {photoLength < 10 && (
        <Button
          as={'label'}
          className={s.selectButton}
          htmlFor={'input-file'}
          onClick={handleInputClick}
          variant={'icon'}
        >
          <Plus />
        </Button>
      )}
    </div>
  )
}
