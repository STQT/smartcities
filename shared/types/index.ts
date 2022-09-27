export interface Tag {
  id: number
  name: string
}

export type PostTypes = "ARTICLE" | "NEWS" | "QUESTION"

export interface Theme {
  id: number
  name: string
  tree_id: number
  parent: number
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
  theme: Theme
  is_liked: boolean
  is_saved: boolean
  comments_count: number
  like_count: number
  saved_count: number
  type: PostTypes
}
