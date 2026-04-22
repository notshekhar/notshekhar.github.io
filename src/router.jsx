import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const RouterContext = createContext(null)

function parseLocation() {
  const params = new URLSearchParams(window.location.search)
  return {
    page: params.get('p') || '',
    slug: params.get('slug') || '',
  }
}

export function RouterProvider({ children }) {
  const [loc, setLoc] = useState(parseLocation)

  useEffect(() => {
    const handler = () => setLoc(parseLocation())
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  const navigate = useCallback((page, slug) => {
    const params = new URLSearchParams()
    if (page) params.set('p', page)
    if (slug) params.set('slug', slug)
    const search = params.toString() ? '?' + params.toString() : '/'
    window.history.pushState({}, '', search)
    setLoc({ page: page || '', slug: slug || '' })
    window.scrollTo(0, 0)
  }, [])

  return (
    <RouterContext.Provider value={{ ...loc, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  return useContext(RouterContext)
}
