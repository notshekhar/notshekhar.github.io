import { useEffect, useRef } from 'react'
import { useRouter } from '../router'

const SCROLL_KEY = 'scroll_positions'

function ScrollRestoration() {
  const { page, slug } = useRouter()
  const prevRef = useRef({ page, slug })

  useEffect(() => {
    const prev = prevRef.current
    const isDetailNow = page === 'project' && slug
    const wasDetail = prev.page === 'project' && prev.slug
    const stored = sessionStorage.getItem(SCROLL_KEY)
    const positions = stored ? JSON.parse(stored) : {}
    const prevKey = `${prev.page}:${prev.slug}`
    const currKey = `${page}:${slug}`

    if (isDetailNow && !wasDetail) {
      positions[prevKey] = window.scrollY
      sessionStorage.setItem(SCROLL_KEY, JSON.stringify(positions))
      window.scrollTo(0, 0)
    } else if (wasDetail && !isDetailNow) {
      const saved = positions[currKey]
      if (saved !== undefined) {
        requestAnimationFrame(() => window.scrollTo(0, saved))
      }
    } else if (prevKey !== currKey) {
      window.scrollTo(0, 0)
    }

    prevRef.current = { page, slug }
  }, [page, slug])

  return null
}

export default ScrollRestoration
