import { useState, useEffect } from 'react'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { RouterProvider, useRouter } from './router'
import Header from './components/Header'
import Projects from './components/Projects'
import ProjectDetail from './components/ProjectDetail'
import Blog from './components/Blog'
import BlogPost from './components/BlogPost'
import About from './components/About'
import ScrollRestoration from './components/ScrollRestoration'

function AppRoutes() {
  const { page, slug } = useRouter()

  if (page === 'about') return <About />
  if (page === 'blog' && slug) return <BlogPost slug={slug} />
  if (page === 'blog') return <Blog />
  if (page === 'project' && slug) return <ProjectDetail slug={slug} />
  return <Projects />
}

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

  return (
    <RouterProvider>
      <NuqsAdapter>
        <div id="app">
          <ScrollRestoration />
          <Header theme={theme} onThemeToggle={toggleTheme} />
          <main className="main">
            <AppRoutes />
          </main>
        </div>
      </NuqsAdapter>
    </RouterProvider>
  )
}

export default App
