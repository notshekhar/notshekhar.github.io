import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { FiCalendar, FiTag, FiArrowLeft } from 'react-icons/fi'
import { getPostBySlug } from '../utils/blog'
import { useRouter } from '../router'

function BlogPost({ slug }) {
  const { navigate } = useRouter()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setPost(getPostBySlug(slug))
    setLoading(false)
  }, [slug])

  if (loading) {
    return (
      <section className="section active">
        <div className="loading">Loading post...</div>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="section active">
        <div className="blog-post-error">
          <h1>Post not found</h1>
          <p>Sorry, that blog post doesn't exist.</p>
          <a href="/?p=blog" onClick={e => { e.preventDefault(); navigate('blog') }} className="back-link">
            <FiArrowLeft size={16} /> Back to blog
          </a>
        </div>
      </section>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <section className="section active">
      <article className="blog-post">
        <header className="blog-post-header">
          <a href="/?p=blog" onClick={e => { e.preventDefault(); navigate('blog') }} className="back-link">
            <FiArrowLeft size={16} /> Back to blog
          </a>
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            <span className="blog-date">
              <FiCalendar size={16} />
              {formatDate(post.date)}
            </span>
            {post.tags.length > 0 && (
              <span className="blog-tags">
                <FiTag size={16} />
                {post.tags.join(', ')}
              </span>
            )}
          </div>
        </header>
        <div className="blog-post-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </article>
    </section>
  )
}

export default BlogPost
