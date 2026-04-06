import Link from 'next/link'
import { getArticleBySlug, getAllArticles } from '../data/articles'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug)
  if (!article) return { title: 'Article Not Found' }

  return {
    title: `${article.title} | BenefitsPath`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      tags: article.tags,
      url: `https://www.benefitspath.org/articles/${article.slug}`,
    },
    alternates: {
      canonical: `https://www.benefitspath.org/articles/${article.slug}`,
    },
  }
}

function renderMarkdown(content) {
  // Simple markdown-to-JSX renderer for article content
  const lines = content.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginTop: 40, marginBottom: 14, fontWeight: 400, color: '#1a1714' }}>
          {line.slice(3)}
        </h2>
      )
      i++
      continue
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} style={{ fontSize: 18, fontWeight: 600, marginTop: 28, marginBottom: 10, color: '#1a1714' }}>
          {line.slice(4)}
        </h3>
      )
      i++
      continue
    }

    // Bold paragraph (starts with **)
    if (line.startsWith('**') && line.includes('**', 2)) {
      const boldEnd = line.indexOf('**', 2)
      const boldText = line.slice(2, boldEnd)
      const rest = line.slice(boldEnd + 2)
      elements.push(
        <p key={i} style={{ fontSize: 16, lineHeight: 1.8, color: '#3a352e', marginBottom: 14 }}>
          <strong style={{ color: '#1a1714' }}>{boldText}</strong>{rest}
        </p>
      )
      i++
      continue
    }

    // Empty line
    if (line.trim() === '') {
      i++
      continue
    }

    // Regular paragraph
    // Handle inline bold
    const parts = line.split(/(\*\*[^*]+\*\*)/)
    const rendered = parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j} style={{ color: '#1a1714' }}>{part.slice(2, -2)}</strong>
      }
      return part
    })

    elements.push(
      <p key={i} style={{ fontSize: 16, lineHeight: 1.8, color: '#3a352e', marginBottom: 14 }}>
        {rendered}
      </p>
    )
    i++
  }

  return elements
}

export default function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: { '@type': 'Organization', name: article.author },
    publisher: { '@type': 'Organization', name: 'BenefitsPath', url: 'https://www.benefitspath.org' },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: `https://www.benefitspath.org/articles/${article.slug}`,
    keywords: article.tags.join(', '),
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />

      {/* JSON-LD Structured Data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#f7f5f0', minHeight: '100vh', color: '#1a1714' }}>

        {/* Nav */}
        <nav style={{ background: '#fff', borderBottom: '1px solid #e5e0d8', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 28, height: 28, background: '#2d6a4f', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 17, color: '#1a1714' }}>BenefitsPath</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/articles" style={{ fontSize: 14, fontWeight: 600, color: '#2d6a4f', textDecoration: 'none' }}>Articles</Link>
            <Link href="/for-attorneys" style={{ fontSize: 14, color: '#5a524a', textDecoration: 'none' }}>For Attorneys</Link>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '20px 24px 0' }}>
          <nav style={{ fontSize: 13, color: '#8a8078' }}>
            <Link href="/" style={{ color: '#8a8078', textDecoration: 'none' }}>Home</Link>
            {' / '}
            <Link href="/articles" style={{ color: '#8a8078', textDecoration: 'none' }}>Articles</Link>
            {' / '}
            <span style={{ color: '#5a524a' }}>{article.category}</span>
          </nav>
        </div>

        {/* Article Header */}
        <header style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{
              background: '#d8f3dc',
              color: '#2d6a4f',
              fontSize: 12,
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
            }}>
              {article.category}
            </span>
            <span style={{ fontSize: 13, color: '#8a8078' }}>{article.readTime}</span>
          </div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 5vw, 42px)', lineHeight: 1.2, marginBottom: 16, fontWeight: 400 }}>
            {article.title}
          </h1>
          <p style={{ fontSize: 17, color: '#5a524a', lineHeight: 1.6, marginBottom: 16 }}>
            {article.description}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 14, color: '#8a8078', paddingBottom: 24, borderBottom: '1px solid #e5e0d8' }}>
            <span>{article.author}</span>
            <span>·</span>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            {article.updatedAt !== article.publishedAt && (
              <>
                <span>·</span>
                <span>Updated {new Date(article.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </>
            )}
          </div>
        </header>

        {/* Article Body */}
        <article style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px 48px' }}>
          {renderMarkdown(article.content)}
        </article>

        {/* CTA Box */}
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 48px' }}>
          <div style={{ background: '#2d6a4f', borderRadius: 20, padding: '40px 32px', textAlign: 'center', color: '#fff' }}>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 10, fontWeight: 400 }}>
              Were you denied unemployment benefits?
            </h2>
            <p style={{ opacity: 0.9, marginBottom: 24, fontSize: 15, maxWidth: 440, margin: '0 auto 24px' }}>
              Take our free eligibility assessment and get connected with an employment attorney in your state.
            </p>
            <Link href="/" style={{ display: 'inline-block', background: '#fff', color: '#2d6a4f', padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              Check Your Eligibility — Free →
            </Link>
          </div>
        </div>

        {/* Tags */}
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 48px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {article.tags.map((tag) => (
              <span key={tag} style={{
                background: '#fff',
                border: '1px solid #e5e0d8',
                fontSize: 13,
                color: '#5a524a',
                padding: '4px 12px',
                borderRadius: 8,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ background: '#1a1714', padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#5a524a', fontSize: 13 }}>© 2025 BenefitsPath. <Link href="/" style={{ color: '#5a524a' }}>Back to homepage</Link></p>
        </div>
      </div>
    </>
  )
}
