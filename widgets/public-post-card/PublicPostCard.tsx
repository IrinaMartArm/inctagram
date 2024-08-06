import React, { useState } from 'react'

import { Paths, useTranslation } from '@/shared/assets'
import { useTimeAgo } from '@/shared/assets/hooks/useTimeAgo'
import { AvatarSimple, Typography } from '@/shared/components'
import { PhotoCarousel } from '@/shared/components/photoCarousel/PhotoCarousel'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './publicPostCard.module.scss'

type Props = {
  avatar: string
  className?: string
  createdAt: string
  description: string
  imagesUrl: string[]
  postId: string
  userId: string
  username: string
}

export const PublicPostCard = (props: Props) => {
  const { t } = useTranslation()

  const truncateMore = 60
  const truncateLess = 200

  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const renderDescription = () => {
    if (isExpanded) {
      return (
        <>
          {props.description.substring(0, truncateLess)}...{' '}
          <span className={s.showMore} onClick={toggleExpanded}>
            {t.showMore.hideText}
          </span>
        </>
      )
    }

    if (props.description.length <= truncateMore) {
      return props.description
    }

    return (
      <>
        {props.description.substring(0, truncateMore)}...{' '}
        <span className={s.showMore} onClick={toggleExpanded}>
          {t.showMore.showMore}
        </span>
      </>
    )
  }

  return (
    <article className={s.container}>
      <Link href={`${Paths.PROFILE}?id=${props.userId}&postId=${props.postId}`}>
        <div className={s.link}></div>
      </Link>
      <div className={s.sliderContainer}>
        <PhotoCarousel height={'240px'} photos={props.imagesUrl} />
      </div>
      <div className={clsx(s.content, isExpanded && s.expanded)}>
        <div className={s.user}>
          <AvatarSimple className={s.avatar} src={props.avatar} title={props.username} />
          <Typography variant={'h3'}>{props.username}</Typography>
        </div>

        <Typography className={s.time} variant={'small-text'}>
          {useTimeAgo(props.createdAt)}
        </Typography>

        <Typography className={s.descriptionContainer} variant={'regular_text-14'}>
          {renderDescription()}
        </Typography>
      </div>
    </article>
  )
}
