export type FlashData = {
  notice?: string
  alert?: string
}

export type CurrentUser = {
  id: number
  email_address: string
}

export type SharedProps = {
  user: CurrentUser | null
  flash: FlashData
}

export type Tag = {
  id: number
  name: string
}

export type Note = {
  id: number
  title: string
  author: string | null
  memo: string | null
  rating: number | null
  createdAt: string
  tags: Tag[]
}
