const fs = require('fs');
const path = require('path');

const projectsDir = path.join(process.cwd(), 'src/projects');
const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'));

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const frontmatter = match[1];
  const content = match[2];
  const data = {};
  for (const line of frontmatter.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
    }
    data[key] = value;
  }
  return { data, content };
}

const projects = files.map(file => {
  const raw = fs.readFileSync(path.join(projectsDir, file), 'utf-8');
  const slug = file.replace('.md', '');
  const { data, content } = parseFrontmatter(raw);
  const hasContent = content && content.trim().length > 0;
  const detailsIncluded = data['details-included'] === 'true' || hasContent;
  
  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString().split('T')[0],
    updated: data.updated || data.date || new Date().toISOString().split('T')[0],
    github: data.github || null,
    demo: data.demo || null,
    technologies: Array.isArray(data.technologies) ? data.technologies : [],
    type: data.type || 'cc',
    status: data.status || 'completed',
    detailSlug: slug,
    detailsIncluded
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date));

const output = `// Auto-generated project metadata - DO NOT EDIT DIRECTLY
// Edit the markdown files in src/projects/ and regenerate this file

export const projects = ${JSON.stringify(projects, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/projectsData.js'), output);
console.log('Generated projectsData.js with', projects.length, 'projects');
