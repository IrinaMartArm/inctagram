import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

import { useTranslationPages } from '@/shared/assets'
import PostApi, { useGetPostsByUserIdQuery } from '@/shared/assets/api/post/post-api'
import { PostType } from '@/shared/assets/api/post/types'
import { MyProfileProps } from '@/widgets'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useAppDispatch } from '@/shared/assets/api/store'

export const useProfile = ({
  isOwner,
  myProfileData,
  postId,
  publicProfile,
  userId,
}: MyProfileProps) => {
  const { t } = useTranslationPages()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [posts, setPosts] = useState<PostType[]>([])
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null)
  const [previousUserId, setPreviousUserId] = useState<string | null>(null)

  const pageSize = 8

  useEffect(() => {
    setPosts([])
    setPage(1)
    setPreviousUserId(userId)
  }, [userId])

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
    if (postsData) {
      setPosts(postsData.items)
    }
  }, [postsData])

  useEffect(() => {
    if (postId && postsData) {
      const postToOpen = postsData.items.find(p => p.id === postId)

      if (postToOpen) {
        setSelectedPost(postToOpen)
        setIsModalOpen(true)
      }
    }
  }, [postId, postsData])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedPost(null)
    router.push(`${router.pathname}?id=${userId}`, undefined, { shallow: true })
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
      router.push(`${router.pathname}?id=${userId}&postId=${post.id}`, undefined, { shallow: true })
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
    posts,
    selectedPost,
    setIsModalOpen,
    t,
    postsData,
  }
}
