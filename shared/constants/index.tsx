import { ReactNode } from "react"
import {
  BellIcon,
  BookmarkIcon,
  NewspaperIcon,
  PencilIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline"

export const GOOGLE_CLIENT_ID =
  "64068091361-oqovmuqkvrel34m7r8b8cpc4dpt5258s.apps.googleusercontent.com"

export const POST_TABS = (
  t: (caption: string) => string
): Record<string, { label: string; icon: ReactNode }> => {
  return {
    questions: {
      label: t("questions"),
      icon: <QuestionMarkCircleIcon height={20} />
    },
    news: {
      label: t("news"),
      icon: <NewspaperIcon height={20} />
    },
    articles: {
      label: t("articles"),
      icon: <PencilIcon height={20} />
    }
  }
}

export const ME_TABS = (
  t: (caption: string) => string
): Record<string, { label: string; icon: ReactNode }> => ({
  profile: {
    label: t("profile"),
    icon: <UserCircleIcon height={20} />
  },
  notifications: {
    label: t("notifications"),
    icon: <BellIcon height={20} />
  },
  posts: {
    label: t("publications"),
    icon: <PencilSquareIcon height={20} />
  },
  saved: {
    label: t("saves"),
    icon: <BookmarkIcon height={20} />
  }
})

export const SEARCH_TABS = (
  t: (caption: string) => string
): Record<string, { label: string; icon: ReactNode }> => ({
  questions: {
    label: t("questions"),
    icon: <QuestionMarkCircleIcon height={20} />
  },
  news: {
    label: t("news"),
    icon: <NewspaperIcon height={20} />
  },
  articles: {
    label: t("articles"),
    icon: <PencilIcon height={20} />
  },
  users: {
    label: "Users",
    icon: <UserCircleIcon height={20} />
  }
})
