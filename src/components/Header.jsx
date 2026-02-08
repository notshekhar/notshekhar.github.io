import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiGithub, FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi'

function Header({ theme, onThemeToggle }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
                <rect width="32" height="32" rx="8" fill="currentColor"/>
                <path d="M8 12C8 10.8954 8.89543 10 10 10H14C15.1046 10 16 10.8954 16 12V20C16 21.1046 15.1046 22 14 22H10C8.89543 22 8 21.1046 8 20V12Z" fill="white"/>
                <path d="M18 14C18 12.8954 18.8954 12 20 12H22C23.1046 12 24 12.8954 24 14V20C24 21.1046 23.1046 22 22 22H20C18.8954 22 18 21.1046 18 20V14Z" fill="white" opacity="0.6"/>
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
            >
              <FiGithub size={16} />
              <span>Follow</span>
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
