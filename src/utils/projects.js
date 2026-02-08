// Project utilities - uses pre-processed data for faster initial load
// Markdown content is loaded lazily only when viewing project details

import { projects, getProjectBySlug as findProject } from '../data/projectsData.js'

// Re-export the pre-processed projects
export function getAllProjectDetails() {
  return projects
}

export function getProjectBySlug(slug) {
  return findProject(slug)
}

// Lazy load markdown content for a specific project
// This is only called when viewing the project detail page
export async function getProjectContent(slug) {
  try {
    // Dynamic import of the markdown file
    const content = await import(`../projects/${slug}.md?raw`)
    return parseMarkdownContent(content.default)
  } catch (err) {
    console.warn(`No markdown content found for: ${slug}`)
    return null
  }
}

// Parse markdown content (extract body, skip frontmatter)
function parseMarkdownContent(raw) {
  const match = raw.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/)
  if (!match) return raw
  return match[1].trim()
}

// Check if a project has detailed content
export function hasProjectDetail(slug) {
  const project = findProject(slug)
  return project?.detailsIncluded || false
}
