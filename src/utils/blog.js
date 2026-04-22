// Manual imports - add new posts here
import helloTensorflow from '../blog/hello-tensorflow.md?raw'

const blogPosts = [
  { slug: 'hello-tensorflow', content: helloTensorflow }
]

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const frontmatter = match[1]
  const content = match[2]
  const data = {}

  for (const line of frontmatter.split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    // Remove surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    // Parse arrays like ["a", "b"]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''))
    }
    data[key] = value
  }

  return { data, content }
}

export function getAllPosts() {
  const posts = blogPosts.map(post => {
    try {
      const { data, content } = parseFrontmatter(post.content)
      return {
        slug: post.slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || content.slice(0, 200) + '...',
        tags: data.tags || [],
        content
      }
    } catch (err) {
      console.error('Error parsing markdown:', post.slug, err)
      return null
    }
  }).filter(Boolean)

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
  const posts = getAllPosts()
  return posts.find(post => post.slug === slug)
}