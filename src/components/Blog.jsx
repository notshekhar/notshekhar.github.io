import { useState, useEffect } from 'react'
import { FiCalendar, FiTag, FiArrowRight } from 'react-icons/fi'
import { getAllPosts } from '../utils/blog'
import { useRouter } from '../router'

function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const posts = getAllPosts()
    setPosts(posts)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <section id="blog" className="section active">
        <div className="section-header">
          <h1 className="page-title">Blog</h1>
          <p className="page-subtitle">Thoughts, tutorials, and things I've learned.</p>
        </div>
        <div className="loading">Loading posts...</div>
      </section>
    )
  }

  return (
    <section id="blog" className="section active">
      <div className="section-header">
        <h1 className="page-title">Blog</h1>
        <p className="page-subtitle">Thoughts, tutorials, and things I've learned.</p>
      </div>

      <div className="blog-list">
        {posts.length === 0 ? (
          <div className="empty-state">
            <p>No blog posts yet. Create one in <code>src/blog/</code>!</p>
          </div>
        ) : (
          posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))
        )}
      </div>
    </section>
  )
}

function BlogCard({ post }) {
  const { navigate } = useRouter()
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <article className="blog-card">
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="blog-date">
            <FiCalendar size={14} />
            {formatDate(post.date)}
          </span>
          {post.tags.length > 0 && (
            <span className="blog-tags">
              <FiTag size={14} />
              {post.tags.join(', ')}
            </span>
          )}
        </div>
        <h2 className="blog-card-title">
          <a href={`/?p=blog&slug=${post.slug}`} onClick={e => { e.preventDefault(); navigate('blog', post.slug) }}>{post.title}</a>
        </h2>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <a href={`/?p=blog&slug=${post.slug}`} onClick={e => { e.preventDefault(); navigate('blog', post.slug) }} className="blog-read-more">
          Read more <FiArrowRight size={14} />
        </a>
      </div>
    </article>
  )
}

export default Blog