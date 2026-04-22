import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiGithub, FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi'

const FOLLOWERS_CACHE_KEY = 'gh_followers_notshekhar'
const FOLLOWERS_TTL_MS = 6 * 60 * 60 * 1000

function formatCount(n) {
  if (n == null) return null
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'k'
  return String(n)
}

function Header({ theme, onThemeToggle }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [followers, setFollowers] = useState(null)

  useEffect(() => {
    let cancelled = false
    try {
      const raw = localStorage.getItem(FOLLOWERS_CACHE_KEY)
      if (raw) {
        const cached = JSON.parse(raw)
        if (cached && Date.now() - cached.ts < FOLLOWERS_TTL_MS) {
          setFollowers(cached.count)
          return
        }
      }
    } catch {}

    fetch('https://api.github.com/users/notshekhar')
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (!data || cancelled) return
        setFollowers(data.followers)
        try {
          localStorage.setItem(
            FOLLOWERS_CACHE_KEY,
            JSON.stringify({ count: data.followers, ts: Date.now() })
          )
        } catch {}
      })
      .catch(() => {})

    return () => { cancelled = true }
  }, [])

  const navItems = [
    { id: 'projects', label: 'Projects', path: '/' },
    { id: 'blog', label: 'Blog', path: '/blog' },
    { id: 'about', label: 'About', path: '/about' }
  ]

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="header-left">
            <Link to="/" className="logo">
              <svg className="logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect className="logo-bg" width="32" height="32" rx="8" fill="currentColor"/>
                <path className="logo-fg" d="M8 12C8 10.8954 8.89543 10 10 10H14C15.1046 10 16 10.8954 16 12V20C16 21.1046 15.1046 22 14 22H10C8.89543 22 8 21.1046 8 20V12Z"/>
                <path className="logo-fg logo-fg-muted" d="M18 14C18 12.8954 18.8954 12 20 12H22C23.1046 12 24 12.8954 24 14V20C24 21.1046 23.1046 22 22 22H20C18.8954 22 18 21.1046 18 20V14Z"/>
              </svg>
              <span>Shekhar</span>
            </Link>
            <nav className="nav">
              {navItems.map(item => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="header-right">
            <a
              href="https://github.com/notshekhar"
              target="_blank"
              rel="noopener noreferrer"
              className="github-follow-btn"
              aria-label={followers != null ? `Follow on GitHub — ${followers} followers` : 'Follow on GitHub'}
            >
              <FiGithub size={16} />
              <span>Follow</span>
              {followers != null && (
                <span className="github-follow-count">{formatCount(followers)}</span>
              )}
            </a>
            <button
              className="theme-toggle"
              onClick={onThemeToggle}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        {navItems.map(item => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={handleMobileNavClick}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export default Header
