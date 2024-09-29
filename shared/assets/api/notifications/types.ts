export type NotificationData = {
  createdAt: string // ISO 8601 date string
  id: string
  isRead: boolean
  message: string
  userId: string
}

export type NotificationResponse = {
  items: NotificationData[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type NotificationArgs = {
  ids: string[]
}

export type NotificationCount = {
  count: number
}
