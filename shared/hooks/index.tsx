import { useRef } from "react"

export const useScrollBlock = () => {
  const safeDocument = typeof document !== "undefined" ? document : {}

  const scrollBlocked = useRef<boolean>()
  /* @ts-ignore */
  const html = safeDocument.documentElement
  /* @ts-ignore */
  const { body } = safeDocument

  const blockScroll = () => {
    if (!body || !body.style || scrollBlocked.current) return

    const scrollBarWidth = window.innerWidth - html.clientWidth
    const bodyPaddingRight =
      parseInt(
        window.getComputedStyle(body).getPropertyValue("padding-right")
      ) || 0

    html.style.position = "relative" /* [1] */
    html.style.overflow = "hidden" /* [2] */
    body.style.position = "relative" /* [1] */
    body.style.overflow = "hidden" /* [2] */
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`

    scrollBlocked.current = true
  }

  const allowScroll = () => {
    if (!body || !body.style || !scrollBlocked.current) return

    html.style.position = ""
    html.style.overflow = ""
    body.style.position = ""
    body.style.overflow = ""
    body.style.paddingRight = ""

    scrollBlocked.current = false
  }

  return [blockScroll, allowScroll]
}
