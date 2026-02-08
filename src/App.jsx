import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import Header from './components/Header'
import Projects from './components/Projects'
import ProjectDetail from './components/ProjectDetail'
import Blog from './components/Blog'
import BlogPost from './components/BlogPost'
import About from './components/About'
import ScrollRestoration from './components/ScrollRestoration'

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    // Apply theme
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <Router>
      <NuqsAdapter>
        <ScrollRestoration />
        <div id="app">
          <Header 
            theme={theme}
            onThemeToggle={toggleTheme}
          />
          <main className="main">
            <Routes>
              <Route path="/" element={<Projects />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project/:slug" element={<ProjectDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </NuqsAdapter>
    </Router>
  )
}

export default App
