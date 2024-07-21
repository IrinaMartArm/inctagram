import React, { useState } from 'react'

import { useTranslation } from '@/shared/assets'
import { useTimeAgo } from '@/shared/assets/hooks/useTimeAgo'
import { AvatarSimple, Typography } from '@/shared/components'
import { PhotoCarousel } from '@/shared/components/photoCarousel/PhotoCarousel'
import { clsx } from 'clsx'

import s from './publicPostCard.module.scss'

type Props = {
  avatarUrl: string
  className?: string
  createdAt: string
  description: string
  imagesUrl: string[]
  username: string
}

export const PublicPostCard = (props: Props) => {
  // const { t } = useTranslation()

  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const renderDescription = () => {
    if (isExpanded) {
      return (
        <>
          {props.description.substring(0, 248)}...{' '}
          <span className={s.showMore} onClick={toggleExpanded}>
            Hide
          </span>
        </>
      )
    }

    if (props.description.length <= 76) {
      return props.description
    }

    return (
      <>
        {props.description.substring(0, 76)}...{' '}
        <span className={s.showMore} onClick={toggleExpanded}>
          Show more
        </span>
      </>
    )
  }

  return (
    <div className={s.container}>
      <div className={s.sliderContainer}>
        <PhotoCarousel height={'240px'} photos={props.imagesUrl} />
      </div>
      <div className={clsx(s.content, isExpanded && s.expanded)}>
        <div className={s.user}>
          <AvatarSimple className={s.avatar} src={props.avatarUrl} title={props.username} />
          <Typography variant={'h3'}>{props.username}</Typography>
        </div>

        <Typography className={s.time} variant={'small-text'}>
          {useTimeAgo(props.createdAt)}
        </Typography>

        <Typography className={s.descriptionContainer} variant={'regular_text-14'}>
          {renderDescription()}
        </Typography>
      </div>
    </div>
  )
}
