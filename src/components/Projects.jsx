import { useState, useEffect, useMemo } from 'react'
import { useQueryState, parseAsStringLiteral } from 'nuqs'
import { useRouter } from '../router'
import {
  FiFolder,
  FiCpu,
  FiCode,
  FiLayout,
  FiServer,
  FiPenTool,
  FiExternalLink,
  FiDownload,
  FiClock,
  FiHexagon,
  FiDatabase,
  FiCopy,
  FiCheck,
  FiTerminal
} from 'react-icons/fi'
import {
  SiReact,
  SiNodedotjs,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiHtml5,
  SiCss3,
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiTensorflow,
  SiGit,
  SiDocker,
  SiKubernetes,
  SiAwslambda,
  SiOpenai,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiTailwindcss,
  SiBootstrap,
  SiRedux,
  SiWebpack,
  SiVite,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiGraphql,
  SiFirebase,
  SiHeroku,
  SiVercel,
  SiNetlify,
  SiFigma,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiCanva,
  SiSocketdotio,
  SiWebrtc,
  SiSass,
  SiJquery,
  SiFlask,
  SiP5Dotjs,
  SiThreedotjs,
  SiEjs,
  SiAffinitydesigner,
  SiScikitlearn,
  SiOpencv,
  SiPytorch,
  SiKeras,
  SiPandas,
  SiNumpy,
  SiOllama,
  SiAnthropic,
  SiHuggingface,
  SiLangchain,
  SiElectron,
  SiD3Dotjs,
  SiChartdotjs,
  SiWebgl,
  SiWebassembly,
  SiBun,
  SiDeno,
  SiPwa
} from 'react-icons/si'
import { getAllProjectDetails } from '../utils/projects'


const typeConfig = {
  all: { name: 'All Projects', icon: FiFolder, color: '#666666' },
  ml: { name: 'Machine Learning', icon: FiCpu, color: '#8b5cf6' },
  cc: { name: 'Coding Challenges', icon: FiCode, color: '#3b82f6' },
  fed: { name: 'Frontend Development', icon: FiLayout, color: '#10b981' },
  bed: { name: 'Full Stack', icon: FiServer, color: '#f59e0b' },
  ld: { name: 'Design', icon: FiPenTool, color: '#ec4899' }
}

const filterTags = [
  { id: 'all', label: 'all', icon: FiFolder, color: '#666666' },
  { id: 'ml', label: 'machine learning', icon: FiCpu, color: '#8b5cf6' },
  { id: 'bed', label: 'full stack', icon: FiServer, color: '#f59e0b' },
  { id: 'fed', label: 'frontend', icon: FiLayout, color: '#10b981' },
  { id: 'cc', label: 'coding challenges', icon: FiCode, color: '#3b82f6' },
  { id: 'ld', label: 'design', icon: FiPenTool, color: '#ec4899' }
]

// Tech icon mapping with brand colors
const techConfig = {
  'react': { icon: SiReact, color: '#61DAFB' },
  'reactjs': { icon: SiReact, color: '#61DAFB' },
  'node': { icon: SiNodedotjs, color: '#339933' },
  'node.js': { icon: SiNodedotjs, color: '#339933' },
  'nodejs': { icon: SiNodedotjs, color: '#339933' },
  'javascript': { icon: SiJavascript, color: '#F7DF1E' },
  'js': { icon: SiJavascript, color: '#F7DF1E' },
  'typescript': { icon: SiTypescript, color: '#3178C6' },
  'ts': { icon: SiTypescript, color: '#3178C6' },
  'python': { icon: SiPython, color: '#3776AB' },
  'html': { icon: SiHtml5, color: '#E34F26' },
  'html5': { icon: SiHtml5, color: '#E34F26' },
  'css': { icon: SiCss3, color: '#1572B6' },
  'css3': { icon: SiCss3, color: '#1572B6' },
  'express': { icon: SiExpress, color: null },
  'expressjs': { icon: SiExpress, color: null },
  'mongo': { icon: SiMongodb, color: '#47A248' },
  'mongodb': { icon: SiMongodb, color: '#47A248' },
  'next': { icon: SiNextdotjs, color: null },
  'nextjs': { icon: SiNextdotjs, color: null },
  'next.js': { icon: SiNextdotjs, color: null },
  'tensorflow': { icon: SiTensorflow, color: '#FF6F00' },
  'tensorflow.js': { icon: SiTensorflow, color: '#FF6F00' },
  'tfjs': { icon: SiTensorflow, color: '#FF6F00' },
  'git': { icon: SiGit, color: '#F05032' },
  'docker': { icon: SiDocker, color: '#2496ED' },
  'kubernetes': { icon: SiKubernetes, color: '#326CE5' },
  'k8s': { icon: SiKubernetes, color: '#326CE5' },
  'aws': { icon: SiAwslambda, color: '#FF9900' },
  'openai': { icon: SiOpenai, color: '#412991' },
  'vue': { icon: SiVuedotjs, color: '#4FC08D' },
  'vuejs': { icon: SiVuedotjs, color: '#4FC08D' },
  'angular': { icon: SiAngular, color: '#DD0031' },
  'svelte': { icon: SiSvelte, color: '#FF3E00' },
  'tailwind': { icon: SiTailwindcss, color: '#06B6D4' },
  'tailwindcss': { icon: SiTailwindcss, color: '#06B6D4' },
  'bootstrap': { icon: SiBootstrap, color: '#7952B3' },
  'redux': { icon: SiRedux, color: '#764ABC' },
  'webpack': { icon: SiWebpack, color: '#8DD6F9' },
  'vite': { icon: SiVite, color: '#646CFF' },
  'postgres': { icon: SiPostgresql, color: '#4169E1' },
  'postgresql': { icon: SiPostgresql, color: '#4169E1' },
  'mysql': { icon: SiMysql, color: '#4479A1' },
  'redis': { icon: SiRedis, color: '#DC382D' },
  'graphql': { icon: SiGraphql, color: '#E10098' },
  'firebase': { icon: SiFirebase, color: '#FFCA28' },
  'heroku': { icon: SiHeroku, color: '#430098' },
  'vercel': { icon: SiVercel, color: null },
  'netlify': { icon: SiNetlify, color: '#00C7B7' },
  'figma': { icon: SiFigma, color: '#F24E1E' },
  'photoshop': { icon: SiAdobephotoshop, color: '#31A8FF' },
  'illustrator': { icon: SiAdobeillustrator, color: '#FF9A00' },
  'canva': { icon: SiCanva, color: '#00C4CC' },
  'api': { icon: FiHexagon, color: '#8b5cf6' },
  'database': { icon: FiDatabase, color: '#666666' },
  'db': { icon: FiDatabase, color: '#666666' },
  // AI / ML
  'ai-sdk': { icon: SiVercel, color: null },
  'aisdk': { icon: SiVercel, color: null },
  'ollama': { icon: SiOllama, color: null },
  'anthropic': { icon: SiAnthropic, color: null },
  'huggingface': { icon: SiHuggingface, color: '#FFD21E' },
  'langchain': { icon: SiLangchain, color: '#1C3C3C' },
  'pytorch': { icon: SiPytorch, color: '#EE4C2C' },
  'keras': { icon: SiKeras, color: '#D00000' },
  'scikit-learn': { icon: SiScikitlearn, color: '#F7931E' },
  'sklearn': { icon: SiScikitlearn, color: '#F7931E' },
  'opencv': { icon: SiOpencv, color: '#5C3EE8' },
  'pandas': { icon: SiPandas, color: '#150458' },
  'numpy': { icon: SiNumpy, color: '#013243' },
  'neuralnetwork': { icon: FiCpu, color: '#8b5cf6' },
  'ml5': { icon: FiCpu, color: '#ED225D' },
  'face-api': { icon: FiCpu, color: '#8b5cf6' },
  'geneticalgo': { icon: FiCpu, color: '#10b981' },
  // Web / Realtime
  'socketio': { icon: SiSocketdotio, color: null },
  'socket.io': { icon: SiSocketdotio, color: null },
  'webrtc': { icon: SiWebrtc, color: '#333333' },
  'peerjs': { icon: SiWebrtc, color: '#333333' },
  'webgl': { icon: SiWebgl, color: '#990000' },
  'webassembly': { icon: SiWebassembly, color: '#654FF0' },
  'wasm': { icon: SiWebassembly, color: '#654FF0' },
  // Creative coding / Viz
  'p5': { icon: SiP5Dotjs, color: '#ED225D' },
  'p5js': { icon: SiP5Dotjs, color: '#ED225D' },
  'three': { icon: SiThreedotjs, color: null },
  'threejs': { icon: SiThreedotjs, color: null },
  'd3': { icon: SiD3Dotjs, color: '#F9A03C' },
  'd3js': { icon: SiD3Dotjs, color: '#F9A03C' },
  'chartjs': { icon: SiChartdotjs, color: '#FF6384' },
  'canvas': { icon: SiHtml5, color: '#E34F26' },
  'htmlcanvas': { icon: SiHtml5, color: '#E34F26' },
  // Templating / CSS
  'ejs': { icon: SiEjs, color: '#A91E50' },
  'ejsview-engine': { icon: SiEjs, color: '#A91E50' },
  'scss': { icon: SiSass, color: '#CC6699' },
  'sass': { icon: SiSass, color: '#CC6699' },
  'jquery': { icon: SiJquery, color: '#0769AD' },
  // Frameworks
  'flask': { icon: SiFlask, color: null },
  'electron': { icon: SiElectron, color: '#47848F' },
  'bun': { icon: SiBun, color: null },
  'bunjs': { icon: SiBun, color: null },
  'deno': { icon: SiDeno, color: null },
  // Design
  'affinitydesigner': { icon: SiAffinitydesigner, color: '#1B72BE' },
  // Chess libs
  'stockfish': { icon: FiCpu, color: '#769656' },
  'chess': { icon: FiCpu, color: '#769656' },
  'chessboard': { icon: FiLayout, color: '#769656' },
  // DB
  'nedb': { icon: FiDatabase, color: '#666666' },
  // LLM / AI Generic
  'llm': { icon: FiCpu, color: '#8b5cf6' },
  'llms': { icon: FiCpu, color: '#8b5cf6' },
  'gpt': { icon: SiOpenai, color: '#412991' },
  'gpt3': { icon: SiOpenai, color: '#412991' },
  'gpt4': { icon: SiOpenai, color: '#412991' },
  'chatgpt': { icon: SiOpenai, color: '#412991' },
  'claude': { icon: SiAnthropic, color: '#D97757' },
  'gemini': { icon: FiCpu, color: '#4285F4' },
  'deepseek': { icon: FiCpu, color: '#0066FF' },
  'mistral': { icon: FiCpu, color: '#FF7000' },
  'llama': { icon: FiCpu, color: '#0467DF' },
  'ai': { icon: FiCpu, color: '#8b5cf6' },
  'ml': { icon: FiCpu, color: '#8b5cf6' },
  'deeplearning': { icon: FiCpu, color: '#8b5cf6' },
  'nlp': { icon: FiCpu, color: '#8b5cf6' },
  'transformers': { icon: SiHuggingface, color: '#FFD21E' },
  'rag': { icon: FiCpu, color: '#8b5cf6' },
  'vectordb': { icon: FiDatabase, color: '#8b5cf6' },
  'embeddings': { icon: FiCpu, color: '#8b5cf6' },
  'pinecone': { icon: FiDatabase, color: '#000000' },
  'chromadb': { icon: FiDatabase, color: '#FF6B6B' },
  // PWA
  'pwa': { icon: SiPwa, color: '#5A0FC8' },
  'progressivewebapp': { icon: SiPwa, color: '#5A0FC8' },
  'serviceworker': { icon: SiPwa, color: '#5A0FC8' }
}

// Create a normalized lookup map for case-insensitive matching
const normalizedTechConfigMap = new Map()
Object.keys(techConfig).forEach(key => {
  normalizedTechConfigMap.set(key.toLowerCase(), techConfig[key])
})

function getTechConfig(tech) {
  // Normalize: lowercase, remove spaces, dots, hyphens, and common suffixes/prefixes
  const normalized = tech
    .toLowerCase()
    .replace(/\s+/g, '')        // Remove spaces
    .replace(/[-_]/g, '')       // Remove hyphens and underscores
    .replace(/\.js$/i, '')      // Remove .js suffix
    .replace(/\.ts$/i, '')      // Remove .ts suffix
    .replace(/\.io$/i, '')      // Remove .io suffix
    .replace(/\.org$/i, '')     // Remove .org suffix
    .replace(/\.com$/i, '')     // Remove .com suffix
    .replace(/\.ai$/i, '')      // Remove .ai suffix
    .replace(/^adobe/i, '')     // Remove adobe prefix
  
  // Try exact match first
  if (techConfig[normalized]) {
    return techConfig[normalized]
  }
  
  // Try the normalized lookup map
  if (normalizedTechConfigMap.has(normalized)) {
    return normalizedTechConfigMap.get(normalized)
  }
  
  // Try some common variations
  const variations = [
    normalized,
    normalized.replace(/js$/, ''),       // Remove trailing 'js'
    normalized + 'js',                    // Add trailing 'js'
    normalized.replace(/\.?dotjs$/, ''),  // Handle 'dotjs' suffix
  ]
  
  for (const variant of variations) {
    if (techConfig[variant]) {
      return techConfig[variant]
    }
    if (normalizedTechConfigMap.has(variant)) {
      return normalizedTechConfigMap.get(variant)
    }
  }
  
  return null
}

// Valid filter values for type safety
const filterValues = ['all', 'ml', 'bed', 'fed', 'cc', 'ld']

function Projects() {
  const { navigate } = useRouter()
  const [projects, setProjects] = useState([])
  const [copied, setCopied] = useState(false)
  const [currentFilter, setCurrentFilter] = useQueryState(
    'tab',
    parseAsStringLiteral(filterValues).withDefault('all')
  )

  const installCommand = 'npm i -g sqlbot'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  useEffect(() => {
    // Load projects from markdown files
    const markdownProjects = getAllProjectDetails()
    setProjects(markdownProjects)
  }, [])


  const allProjects = useMemo(() => {
    // Projects from markdown are already a flat array
    return projects.map(p => ({
      ...p,
      year: new Date(p.date).getFullYear().toString(),
      url: p.github
    }))
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (currentFilter === 'all') return allProjects
    return allProjects.filter(p => p.type === currentFilter)
  }, [allProjects, currentFilter])

  const groupedProjects = useMemo(() => {
    return filteredProjects.reduce((acc, project) => {
      if (!acc[project.year]) acc[project.year] = []
      acc[project.year].push(project)
      return acc
    }, {})
  }, [filteredProjects])


  const sortedYears = useMemo(() => {
    return Object.keys(groupedProjects).sort((a, b) => b - a)
  }, [groupedProjects])

  const totalProjects = allProjects.length
  const latestYear = useMemo(() => {
    const years = allProjects
      .map(p => new Date(p.updated || p.date).getFullYear())
      .filter(y => !Number.isNaN(y))
    return years.length ? Math.max(...years) : new Date().getFullYear()
  }, [allProjects])
  const totalRounded = Math.max(10, Math.floor(totalProjects / 10) * 10)

  return (
    <section id="projects" className="section active">
      {/* Ollama-style Model Header */}
      <div className="model-header">
        <h1 className="model-title">
            Shekhar Tyagi
        </h1>
        <div className="model-meta">
          <span className="meta-item meta-projects">
            <FiDownload size={14} />
            {totalRounded}+ Projects
          </span>
          <span className="meta-item meta-updated">
            <FiClock size={14} />
            Updated {latestYear}
          </span>
        </div>
        <p className="model-description">
          A collection of projects spanning machine learning, web development, and creative coding experiments.
          Building things at the intersection of AI and the web, with a focus on making complex ideas interactive
          and accessible through the browser.
        </p>

        {/* Tags like Ollama */}
        <div className="tags-container">
          <span className="tag tag-vision">machine learning</span>
          <span className="tag tag-tools">web development</span>
          <span className="tag tag-thinking">creative coding</span>
          <span className="tag tag-cloud">open source</span>
        </div>
      </div>

      {/* Terminal install block */}
      <div className="code-block">
        <div className="code-header">
          <div className="code-dots" aria-hidden="true">
            <span className="code-dot code-dot-red"></span>
            <span className="code-dot code-dot-yellow"></span>
            <span className="code-dot code-dot-green"></span>
          </div>
          <div className="code-title">
            <FiTerminal size={13} />
            <span>zsh — install</span>
          </div>
          <button
            className={`code-copy ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            aria-label={copied ? 'Copied' : 'Copy command'}
            title={copied ? 'Copied!' : 'Copy'}
          >
            {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <div className="code-content">
          <pre>
            <span className="code-prompt">$</span>
            <span className="code-cmd">npm</span>
            <span className="code-flag">i -g</span>
            <a href="https://www.oboe.chat/sqlbot" target="_blank" rel="noopener noreferrer" className="code-link">
              sqlbot
              <FiExternalLink size={11} />
            </a>
          </pre>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs" role="tablist">
        {filterTags.map(tag => {
          const Icon = tag.icon
          const isActive = currentFilter === tag.id
          return (
            <button
              key={tag.id}
              role="tab"
              aria-selected={isActive}
              className={`filter-tab ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentFilter(tag.id)}
            >
              <Icon size={14} style={{ color: isActive ? tag.color : 'currentColor' }} />
              <span>{tag.label}</span>
            </button>
          )
        })}
      </div>

      {/* Projects List */}
      <div className="projects-list">
        {sortedYears.length === 0 ? (
          <div className="empty-state">
            <p>No projects found.</p>
          </div>
        ) : (
          sortedYears.map(year => (
            <div key={year} className="year-section">
              <div className="year-header">
                <span className="year-label">{year}</span>
                <span className="year-count">{groupedProjects[year].length} projects</span>
              </div>
              {groupedProjects[year].map((project, index) => (
                <ProjectCard key={`${year}-${index}`} project={project} />
              ))}
            </div>
          ))
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  const type = typeConfig[project.type] || typeConfig.all
  const Icon = type.icon

  return (
    <div className="project-card" data-type={project.type}>
      <div className="project-icon" style={{ color: type.color }}>
        <Icon size={20} />
      </div>
      <div className="project-content">
        <div className="project-header">
          <h3 className="project-title">
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              {project.title}
            </a>
          </h3>
          <div className="project-dates">
            <span className="project-date">{project.date}</span>
            {project.updated && project.updated !== project.date && (
              <span className="project-updated">Updated: {project.updated}</span>
            )}
          </div>
        </div>
        {project.description && (
          <p className="project-description">{project.description}</p>
        )}
        {project.technologies && (
          <div className="project-techs">
            {project.technologies.map((tech, i) => {
              const techInfo = getTechConfig(tech)
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
        <div className="project-meta">
          <div className="project-links">
            {project.detailsIncluded && (
              <a
                href={`/?p=project&slug=${project.slug}`}
                onClick={e => { e.preventDefault(); navigate('project', project.slug) }}
                className="project-link project-link-details"
              >
                <FiExternalLink size={14} />
                Details
              </a>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                <FiExternalLink size={14} />
                View
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                <FiExternalLink size={14} />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
