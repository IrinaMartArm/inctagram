import React, { forwardRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { MOBILE_BREAKPOINT } from '@/shared/assets/constants'
import { useIsMobile } from '@/shared/assets/hooks'

import s from './avatarEdit.module.scss'

type Props = {
  image: string
}

export const AvatarEdit = forwardRef<AvatarEditor, Props>(({ image }, ref) => {
  const [scale, setScale] = useState(1.2)
  const isMobile = useIsMobile(MOBILE_BREAKPOINT)

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY < 0) {
      setScale(prevScale => prevScale + 0.15)
    } else {
      setScale(prevScale => prevScale - 0.15)
    }
  }

  const size = isMobile ? 270 : 312

  return (
    <div className={s.wrapper} onWheel={handleWheel}>
      <AvatarEditor
        border={10}
        borderRadius={150}
        color={[23, 23, 23, 0.87]}
        height={size}
        image={image}
        ref={ref}
        rotate={0}
        scale={scale}
        width={size}
      />
    </div>
  )
})
