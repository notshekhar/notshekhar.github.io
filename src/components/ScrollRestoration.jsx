import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const SCROLL_KEY = 'scroll_positions'

function ScrollRestoration() {
  const location = useLocation()
  const prevPathRef = useRef(location.pathname)

  useEffect(() => {
    const prevPath = prevPathRef.current
    const currentPath = location.pathname
    
    // Get stored scroll positions
    const stored = sessionStorage.getItem(SCROLL_KEY)
    const positions = stored ? JSON.parse(stored) : {}

    // If navigating TO a project detail page, save current scroll and scroll to top
    if (currentPath.startsWith('/project/') && !prevPath.startsWith('/project/')) {
      // Save scroll position for the page we're leaving
      positions[prevPath] = window.scrollY
      sessionStorage.setItem(SCROLL_KEY, JSON.stringify(positions))
      
      // Scroll to top for detail page
      window.scrollTo(0, 0)
    }
    // If navigating FROM project detail back to projects list, restore scroll
    else if (prevPath.startsWith('/project/') && !currentPath.startsWith('/project/')) {
      const savedPosition = positions[currentPath]
      if (savedPosition !== undefined) {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          window.scrollTo(0, savedPosition)
        })
      }
    }
    // For other navigation, scroll to top
    else if (prevPath !== currentPath) {
      window.scrollTo(0, 0)
    }

    prevPathRef.current = currentPath
  }, [location.pathname])

  return null
}

export default ScrollRestoration
