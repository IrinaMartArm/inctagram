import { useCallback, useEffect, useState } from 'react'

import { useTranslationPages } from '@/shared/assets'
import { useGetPostsByUserIdQuery } from '@/shared/assets/api/post/post-api'
import { PostType } from '@/shared/assets/api/post/types'
import { MyProfileProps } from '@/widgets'
import { useRouter } from 'next/router'

export const useProfile = ({
  isMyProfile,
  myProfileData,
  post,
  publicProfile,
  userId,
}: MyProfileProps) => {
  const { t } = useTranslationPages()
  const router = useRouter()
  const { postId } = router.query as string
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null)

  const pageSize = 8
  const {
    data: posts,
    isFetching,
    isLoading,
  } = useGetPostsByUserIdQuery({
    page: page.toString(),
    pageSize: pageSize.toString(),
    userId: userId,
  })

  useEffect(() => {
    if (postId && posts) {
      const postToOpen = posts.items.find(p => p.id === postId)

      if (postToOpen) {
        setSelectedPost(postToOpen)
        setIsModalOpen(true)
      }
    }
  }, [postId, posts])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedPost(null)
    router.push(`${router.pathname}?id=${userId}`, undefined, { shallow: true })
  }, [router])

  const loadMorePosts = useCallback(() => {
    if (!isFetching && !isLoading && posts && posts.pagesCount > page) {
      setPage(prevPage => prevPage + 1)
    }
  }, [isFetching, isLoading, posts, page])

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
      router.push(`${router.pathname}?id=${userId}&postId=${post.id}`, undefined, { shallow: true })
    },
    [router]
  )

  const avatar = isMyProfile ? myProfileData?.avatar?.url : publicProfile?.avatar?.url
  const aboutMe = isMyProfile ? myProfileData?.aboutMe : publicProfile?.aboutMe

  return {
    aboutMe,
    avatar,
    closeModal,
    handlePostClick,
    isLoading,
    isModalOpen,
    posts,
    selectedPost,
    setIsModalOpen,
    t,
  }
}
