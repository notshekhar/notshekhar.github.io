import { useState, useEffect } from 'react'
import { useRouter } from '../router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { 
  FiCalendar, 
  FiArrowLeft, 
  FiExternalLink, 
  FiGithub,
  FiClock,
  FiCpu,
  FiCode,
  FiLayout,
  FiServer,
  FiPenTool,
  FiFolder
} from 'react-icons/fi'
import {
  SiReact,
  SiNodedotjs,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiVercel
} from 'react-icons/si'
import { getProjectBySlug, getProjectContent } from '../utils/projects'

const typeConfig = {
  ml: { name: 'Machine Learning', icon: FiCpu, color: '#8b5cf6' },
  cc: { name: 'Coding Challenges', icon: FiCode, color: '#3b82f6' },
  fed: { name: 'Frontend Development', icon: FiLayout, color: '#10b981' },
  bed: { name: 'Full Stack', icon: FiServer, color: '#f59e0b' },
  ld: { name: 'Design', icon: FiPenTool, color: '#ec4899' }
}

const techConfig = {
  'react': { icon: SiReact, color: '#61DAFB' },
  'next.js': { icon: SiNextdotjs, color: null },
  'nextjs': { icon: SiNextdotjs, color: null },
  'typescript': { icon: SiTypescript, color: '#3178C6' },
  'javascript': { icon: SiJavascript, color: '#F7DF1E' },
  'node.js': { icon: SiNodedotjs, color: '#339933' },
  'ai sdk': { icon: SiVercel, color: null },
  'ai-sdk': { icon: SiVercel, color: null },
  'llm': { icon: FiCpu, color: '#8b5cf6' }
}

function getTechIcon(tech) {
  const normalized = tech.toLowerCase().replace(/\s+/g, '')
  return techConfig[normalized] || techConfig[tech.toLowerCase()] || null
}

function ProjectDetail({ slug }) {
  const { navigate } = useRouter()
  const [project, setProject] = useState(null)
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProject() {
      // First get the project metadata (fast, from pre-parsed data)
      const projectData = getProjectBySlug(slug)
      setProject(projectData)
      
      // Then lazy load the markdown content if project has details
      if (projectData?.detailsIncluded || projectData?.detailSlug) {
        const markdownContent = await getProjectContent(projectData.detailSlug || slug)
        setContent(markdownContent)
      }
      
      setLoading(false)
    }
    
    loadProject()
  }, [slug])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (loading) {
    return (
      <section className="section active">
        <div className="loading">Loading project...</div>
      </section>
    )
  }

  if (!project) {
    return (
      <section className="section active">
        <div className="project-detail-error">
          <h1>Project not found</h1>
          <p>Sorry, details for this project aren't available yet.</p>
          <a href="/" onClick={e => { e.preventDefault(); navigate('') }} className="back-link">
            <FiArrowLeft size={16} /> Back to projects
          </a>
        </div>
      </section>
    )
  }

  const type = typeConfig[project.type] || { name: 'Project', icon: FiFolder, color: '#666666' }
  const TypeIcon = type.icon

  return (
    <section className="section active">
      <article className="project-detail">
        <header className="project-detail-header">
          <a href="/" onClick={e => { e.preventDefault(); navigate('') }} className="back-link">
            <FiArrowLeft size={16} /> Back to projects
          </a>
          
          <div className="project-detail-title-row">
            <div className="project-detail-icon" style={{ color: type.color }}>
              <TypeIcon size={28} />
            </div>
            <h1 className="project-detail-title">{project.title}</h1>
          </div>
          
          <div className="project-detail-meta">
            <span className="project-detail-date">
              <FiCalendar size={16} />
              {formatDate(project.date)}
            </span>
            {project.updated && project.updated !== project.date && (
              <span className="project-detail-updated">
                <FiClock size={16} />
                Updated {formatDate(project.updated)}
              </span>
            )}
            <span className="project-detail-type" style={{ color: type.color }}>
              <TypeIcon size={16} />
              {type.name}
            </span>
          </div>

          {project.technologies && project.technologies.length > 0 && (
            <div className="project-detail-techs">
              {project.technologies.map((tech, i) => {
                const techInfo = getTechIcon(tech)
                if (!techInfo) {
                  return <span key={i} className="tech-badge">{tech}</span>
                }
                const TechIcon = techInfo.icon
                return (
                  <span key={i} className="tech-badge">
                    <TechIcon size={12} style={techInfo.color ? { color: techInfo.color } : undefined} />
                    {tech}
                  </span>
                )
              })}
            </div>
          )}

          <div className="project-detail-links">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail-link primary"
              >
                <FiExternalLink size={16} />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail-link"
              >
                <FiGithub size={16} />
                View Source
              </a>
            )}
          </div>
        </header>
        
        <div className="project-detail-content">
          {content ? (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const isBlock =
                    inline === false ||
                    (className && /language-/.test(className)) ||
                    (typeof children?.[0] === 'string' && children[0].includes('\n'))
                  return isBlock ? (
                    <code className={className} {...props}>{children}</code>
                  ) : (
                    <code className={`inline-code ${className || ''}`} {...props}>{children}</code>
                  )
                },
                pre({ children, ...props }) {
                  return <pre className="code-block-content" {...props}>{children}</pre>
                }
              }}
            >
              {content}
            </ReactMarkdown>
          ) : (
            <p className="no-content-message">Detailed documentation coming soon.</p>
          )}
        </div>
      </article>
    </section>
  )
}

export default ProjectDetail
