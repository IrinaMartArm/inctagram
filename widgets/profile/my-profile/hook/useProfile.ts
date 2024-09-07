import { useCallback, useEffect, useState } from 'react'

import { useTranslationPages } from '@/shared/assets'
import { useGetPostsByUserIdQuery } from '@/shared/assets/api/post/post-api'
import { PostType } from '@/shared/assets/api/post/types'
import { Publication } from '@/shared/assets/api/subscriptions/types'
import { MyProfileProps } from '@/widgets'
import { useRouter } from 'next/router'

export const useProfile = ({
  isOwner,
  myProfileData,
  postId,
  publicProfile,
  userId,
}: MyProfileProps) => {
  const { t } = useTranslationPages()
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedPost, setSelectedPost] = useState<Publication | null>(null)

  const pageSize = 8

  const {
    data: postsData,
    isFetching,
    isLoading,
  } = useGetPostsByUserIdQuery(
    {
      page: page.toString(),
      pageSize: pageSize.toString(),
      userId: isOwner ? userId : '',
    },
    {
      refetchOnMountOrArgChange: true,
    }
  )

  useEffect(() => {
    if (postId) {
      const postToOpen = publicProfile?.publications.find(p => p.id === postId)

      if (postToOpen) {
        setSelectedPost(postToOpen)
        setIsModalOpen(true)
      }
    }
  }, [postId, postsData])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedPost(null)
    void router.push(`${router.pathname}?id=${userId}`, undefined, { shallow: true })
  }, [router])

  const loadMorePosts = useCallback(() => {
    if (!isFetching && !isLoading && postsData && postsData.pagesCount > page) {
      setPage(prevPage => prevPage + 1)
    }
  }, [isFetching, isLoading, postsData, page])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        loadMorePosts()
      }
    }

    window.addEventListener('scroll', handleScroll, { capture: true })

    return () => window.removeEventListener('scroll', handleScroll, { capture: true })
  }, [loadMorePosts])

  const handlePostClick = useCallback(
    (post: PostType) => {
      setSelectedPost(post)
      setIsModalOpen(true)
      void router.push(`${router.pathname}?id=${userId}&postId=${post.id}`, undefined, {
        shallow: true,
      })
    },
    [router, userId]
  )

  const avatar = isOwner ? myProfileData?.avatar?.url : publicProfile?.avatar?.url
  const aboutMe = isOwner ? myProfileData?.aboutMe : publicProfile?.aboutMe

  return {
    aboutMe,
    avatar,
    closeModal,
    handlePostClick,
    isLoading,
    isModalOpen,
    postsData,
    selectedPost,
    setIsModalOpen,
    t,
  }
}
