import { useEffect, useState } from 'react'
import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMail,
  FiCpu,
  FiCloud,
  FiCode,
  FiTerminal,
  FiCoffee,
  FiBriefcase,
  FiMapPin,
  FiCalendar,
  FiExternalLink,
  FiStar,
  FiGitBranch
} from 'react-icons/fi'
import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiJavascript,
  SiPython,
  SiTensorflow,
  SiNextdotjs,
  SiBun,
  SiKubernetes
} from 'react-icons/si'

const techStack = [
  { name: 'React / Next.js', icon: SiNextdotjs, color: null },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Bun', icon: SiBun, color: null },
  { name: 'TensorFlow.js', icon: SiTensorflow, color: '#FF6F00' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Java', icon: FiCoffee, color: '#007396' },
  { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
  { name: 'AWS', icon: FiCloud, color: '#FF9900' },
]

const connectLinks = [
  { name: 'GitHub', icon: FiGithub, url: 'https://github.com/notshekhar' },
  { name: 'Twitter', icon: FiTwitter, url: 'https://twitter.com/notshekhar' },
  { name: 'LinkedIn', icon: FiLinkedin, url: 'https://linkedin.com/in/notshekhar' },
  { name: 'Email', icon: FiMail, url: 'mailto:notshekhar@gmail.com' },
]

const experience = [
  {
    company: 'oboe.chat',
    logo: null,
    role: 'Founder',
    period: 'Dec 2025 - Present',
    duration: '4 m',
    location: 'India',
    type: 'Full-Time',
    url: 'https://www.oboe.chat',
    current: true,
    verified: true,
  },
  {
    company: 'cohhi',
    logo: 'https://dqy38fnwh4fqs.cloudfront.net/company/COMHEOLROQ6KL7NQPIR7KOGAQELKPP/logo-1747508882367.webp',
    role: 'Co-Founder & CTO',
    period: 'Jan 2025 - Present',
    duration: '1 yr, 3 m',
    location: 'Gurugram, IN',
    type: 'Full-Time',
    current: true,
    verified: true,
  },
  {
    company: 'Driffle',
    logo: null,
    role: 'Founding Engineer',
    period: 'Dec 2021 - Present',
    duration: '4 yr, 4 m',
    location: 'Gurugram, IN',
    type: 'Full-Time',
    url: 'https://driffle.com',
    current: true,
    verified: true,
  },
  {
    company: 'Content Creation',
    logo: null,
    role: 'Co-Founder',
    period: 'Mar 2020 - Apr 2021',
    duration: '1 yr, 1 m',
    location: 'Noida, Uttar Pradesh, India',
    type: '',
  },
  {
    company: 'ThunderBuzz',
    logo: null,
    role: 'Full-stack Developer Intern',
    period: 'Apr 2019 - Aug 2019',
    duration: '4 m',
    location: 'Work From Home',
    type: '',
  },
]

const applications = [
  { 
    name: 'Neural Networks', 
    command: 'ML & AI experiments',
    icon: FiCpu,
    url: '#projects'
  },
  { 
    name: 'Web Development', 
    command: 'Full stack applications',
    icon: FiCode,
    url: '#projects'
  },
  { 
    name: 'Cloud Services', 
    command: 'AWS & K8s deployments',
    icon: FiCloud,
    url: '#projects'
  },
  { 
    name: 'Creative Coding', 
    command: 'Interactive experiments',
    icon: FiTerminal,
    url: '#projects'
  },
]

const REPOS_CACHE_KEY = 'gh_repos_notshekhar_v3'
const REPOS_TTL_MS = 6 * 60 * 60 * 1000
const REPO_EXCLUDE_PATTERNS = [/dank.?mono/i]
const isExcluded = name => REPO_EXCLUDE_PATTERNS.some(re => re.test(name))

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  Java: '#b07219',
  C: '#555555',
  'C++': '#f34b7d',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Jupyter: '#DA5B0B',
  'Jupyter Notebook': '#DA5B0B',
}

function About() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    let cancelled = false
    try {
      const raw = localStorage.getItem(REPOS_CACHE_KEY)
      if (raw) {
        const cached = JSON.parse(raw)
        if (cached && Date.now() - cached.ts < REPOS_TTL_MS) {
          setRepos(cached.repos)
          return
        }
      }
    } catch {}

    fetch('https://api.github.com/users/notshekhar/repos?sort=pushed&per_page=100')
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (!data || cancelled) return
        const top = data
          .filter(r => !r.fork && !isExcluded(r.name))
          .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at) - new Date(a.pushed_at)))
          .slice(0, 6)
          .map(r => ({
            name: r.name,
            description: r.description,
            language: r.language,
            stars: r.stargazers_count,
            forks: r.forks_count,
            url: r.html_url,
          }))
        setRepos(top)
        try {
          localStorage.setItem(REPOS_CACHE_KEY, JSON.stringify({ repos: top, ts: Date.now() }))
        } catch {}
      })
      .catch(() => {})

    return () => { cancelled = true }
  }, [])

  return (
    <section id="about" className="section active">
      <div className="about-content">
        <div className="about-intro">
          <img 
            src="./assets/slasho-l.webp" 
            alt="Shekhar" 
            className="about-avatar"
          />
          <div className="about-text">
            <p>
              Hey, I'm <strong>Shekhar</strong>. I'm a developer who builds things at the 
              intersection of <strong>machine learning</strong> and the <strong>web</strong>. 
            </p>
            <p>
              Over the years, I've shipped <strong>200+ projects</strong> — from neural networks 
              running in the browser, to full-stack apps, to creative coding experiments. 
              I love exploring how things work under the hood and turning complex ideas into 
              something you can interact with.
            </p>
            <p>
              Currently exploring AI-powered applications, cloud infrastructure with 
              Kubernetes and AWS, and building tools that make development more fun.
            </p>
          </div>
        </div>

        {/* Experience timeline */}
        <div className="about-section experience-section">
          <div className="exp-header">
            <h3>Experience</h3>
            <span className="exp-total">5 years, 9 months</span>
          </div>
          <div className="exp-list">
            {experience.map((job, i) => {
              const initial = job.company.replace(/[^a-zA-Z0-9]/g, '').charAt(0).toUpperCase()
              const isLast = i === experience.length - 1
              return (
                <div key={i} className={`exp-entry ${job.current ? 'exp-entry-current' : ''} ${isLast ? 'exp-entry-last' : ''}`}>
                  <div className="exp-company-header">
                    {job.logo ? (
                      <img src={job.logo} alt={job.company} className="exp-logo" loading="lazy" />
                    ) : (
                      <span className="exp-logo exp-logo-fallback">{initial}</span>
                    )}
                    {job.url ? (
                      <a href={job.url} target="_blank" rel="noopener noreferrer" className="exp-company-name exp-company-link">
                        {job.company}
                      </a>
                    ) : (
                      <span className="exp-company-name">{job.company}</span>
                    )}
                  </div>
                  <div className="exp-role-block">
                    <div className="exp-elbow" aria-hidden="true"></div>
                    <div className="exp-role-content">
                      <div className="exp-role-line">
                        <span className="exp-role-title">{job.role}</span>
                        {job.verified && (
                          <svg className="exp-verified" width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M8.4773 2.80234C9.21702 1.73255 10.7828 1.73255 11.5225 2.80234C11.9706 3.45043 12.7717 3.74544 13.5267 3.54042C14.773 3.20199 15.9725 4.22029 15.8595 5.52087C15.791 6.30877 16.2173 7.05577 16.9259 7.38975C18.0957 7.94104 18.3675 9.50115 17.4547 10.424C16.9017 10.983 16.7537 11.8325 17.0844 12.5492C17.6302 13.7322 16.8473 15.1042 15.5618 15.2174C14.783 15.286 14.1299 15.8405 13.9279 16.6046C13.5944 17.8658 12.1231 18.4076 11.0663 17.6583C10.4262 17.2044 9.57363 17.2044 8.93345 17.6583C7.87671 18.4076 6.40539 17.8658 6.07192 16.6046C5.86989 15.8405 5.21682 15.286 4.43803 15.2174C3.15249 15.1042 2.36961 13.7322 2.91544 12.5492C3.24611 11.8325 3.09807 10.983 2.54507 10.424C1.63224 9.50115 1.90413 7.94104 3.07386 7.38975C3.78249 7.05577 4.20875 6.30877 4.1403 5.52087C4.02731 4.22029 5.22675 3.20199 6.47304 3.54042C7.22807 3.74544 8.02918 3.45043 8.4773 2.80234Z" fill="#27AE60"/>
                            <path d="M6.66667 10.254L8.66667 12.1112L13.3333 7.77783" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div className="exp-meta-line">
                        <strong>{job.period} ({job.duration})</strong>
                        <span> · {job.location}</span>
                        {job.type && <span> · {job.type}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* GitHub Insights */}
        <div className="about-section github-insights">
          <div className="exp-header">
            <h3>GitHub Insights</h3>
            <a
              href="https://github.com/notshekhar"
              target="_blank"
              rel="noopener noreferrer"
              className="exp-link"
            >
              <FiGithub size={13} /> @notshekhar
            </a>
          </div>

          <div className="gh-card gh-contrib">
            <div className="gh-card-title">Contributions — last year</div>
            <img
              src="https://ghchart.rshah.org/216e39/notshekhar"
              alt="notshekhar GitHub contribution graph"
              className="gh-contrib-img"
              loading="lazy"
            />
          </div>

          {repos.length > 0 && (
            <div className="gh-repo-grid">
              {repos.map(repo => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gh-repo-card"
                >
                  <div className="gh-repo-name">
                    <span className="gh-repo-owner">notshekhar/</span>
                    <strong>{repo.name}</strong>
                  </div>
                  {repo.description && (
                    <div className="gh-repo-desc">{repo.description}</div>
                  )}
                  <div className="gh-repo-meta">
                    {repo.language && (
                      <span className="gh-repo-lang">
                        <span
                          className="gh-lang-dot"
                          style={{ background: LANG_COLORS[repo.language] || '#888' }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stars > 0 && (
                      <span className="gh-repo-stat">
                        <FiStar size={12} /> {repo.stars}
                      </span>
                    )}
                    {repo.forks > 0 && (
                      <span className="gh-repo-stat">
                        <FiGitBranch size={12} /> {repo.forks}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Applications Section - Ollama Style */}
        <div className="applications-section">
          <h3 className="section-heading">Applications</h3>
          <div className="applications-list">
            {applications.map((app, index) => (
              <a 
                key={index} 
                href={app.url}
                className="application-item"
              >
                <div className="app-info">
                  <div className="app-icon">
                    <app.icon size={18} />
                  </div>
                  <div className="app-details">
                    <span className="app-name">{app.name}</span>
                    <span className="app-command">{app.command}</span>
                  </div>
                </div>
                <span className="app-link">View →</span>
              </a>
            ))}
          </div>
        </div>

        <div className="about-section">
          <h3>What I work with</h3>
          <div className="tech-grid">
            {techStack.map((tech, index) => (
              <div key={index} className="tech-item">
                <span className="tech-icon" style={tech.color ? { color: tech.color } : undefined}>
                  <tech.icon size={18} />
                </span>
                {tech.name}
              </div>
            ))}
          </div>
        </div>

        <div className="about-section">
          <h3>Connect</h3>
          <div className="connect-grid">
            {connectLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="connect-card"
              >
                <link.icon size={20} />
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
