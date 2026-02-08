import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMail,
  FiCpu,
  FiCloud,
  FiCode,
  FiTerminal,
  FiCoffee
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

function About() {
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
