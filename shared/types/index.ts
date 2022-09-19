export interface Tag {
  id: number
  name: string
}

export interface Theme {
  id: number
  name: string
  tree_id: number
  parent: number
}

export interface User {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
}

export interface News {
  id: number
  tags: Tag[]
  title: string
  image: string
  description: string
  view_count: number
  created_at: string
  is_delete: boolean
  is_active: boolean
  is_draft: boolean
  user: User
  theme: Theme
  is_liked: boolean
  comments_count: number
  like_count: number
}

export interface Article {
  comments_count: number
  description: string
  view_count: number
  created_at: string
  id: number
  image: string
  is_active: boolean
  is_delete: boolean
  is_draft: boolean
  is_liked: boolean
  like_count: number
  theme: Theme
  title: string
  tags: Tag[]
  user: User
}

export interface Question {
  id: number
  tags: Tag[]
  title: string
  image: string
  description: string
  view_count: number
  created_at: string
  is_delete: boolean
  is_active: boolean
  is_draft: boolean
  user: User
  theme: Theme
  is_liked: boolean
  comments_count: number
  like_count: number
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

export interface QuestionImage {
  id: number
  image: string
  default: boolean
  question: number
}
