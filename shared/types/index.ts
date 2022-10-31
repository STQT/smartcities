export interface Tag {
  id: number
  name: string
}

export type PostTypes = "ARTICLE" | "NEWS" | "QUESTION"

export type Language = "gb" | "uz" | "tu" | "az" | "kz" | "kr"

export interface Theme {
  id: number
  icon: string
  preview_icon: string

  name: string
  name_az: string
  name_kr: string
  name_kz: string
  name_tu: string
  name_uz: string
}

export interface Notification {
  id: number
  description: string
  is_read: boolean
  title: string
}

export interface Comment {
  id: number
  comment: string
  created_at: string
  user: User
  article?: number
  news?: number
  question?: number
  parent: null
}

export interface User {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  gender: boolean
  organization_name: string
  phone: string
  work_name: string
  image: string
  country_code: string
  country: string
  birthday_date: string
  password: string
}

export interface Post {
  id: number
  tags: Tag[]
  title: string
  image: string
  description: string
  view_count: number
  created_at: string
  user: User
  subtitle: string
  theme: Theme
  is_liked: boolean
  is_saved: boolean
  comments_count: number
  like_count: number
  saved_count: number
  type: PostTypes
}
