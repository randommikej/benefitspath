import Link from 'next/link'
import { getArticleBySlug, getAllArticles } from '../data/articles'
import { notFound } from 'next/navigation'
import CertReminderSignup from '../../../components/CertReminderSignup'

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug)
  if (!article) return { title: 'Article Not Found' }

  return {
    title: article.title,
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

const P_STYLE = { fontSize: 16, lineHeight: 1.8, color: '#3a352e', marginBottom: 14 }
const LINK_STYLE = { color: '#2d6a4f', textDecoration: 'underline' }

// Inline markdown: **bold**, *italic*, [text](url) and bare https:// URLs.
function renderInline(text, keyBase = 'x') {
  const out = []
  const re = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\)|https?:\/\/[^\s)]+|\*[^*\s][^*]*\*)/g
  let last = 0
  let m
  let n = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const tok = m[0]
    const key = `${keyBase}-${n++}`
    if (tok.startsWith('**')) {
      out.push(<strong key={key} style={{ color: '#1a1714' }}>{renderInline(tok.slice(2, -2), key)}</strong>)
    } else if (tok.startsWith('[')) {
      const close = tok.indexOf('](')
      const label = tok.slice(1, close)
      const href = tok.slice(close + 2, -1)
      if (href.startsWith('/')) out.push(<Link key={key} href={href} style={LINK_STYLE}>{label}</Link>)
      else out.push(<a key={key} href={href} target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>{label}</a>)
    } else if (tok.startsWith('http')) {
      const trail = tok.match(/[.,;:]+$/)
      const url = trail ? tok.slice(0, -trail[0].length) : tok
      out.push(<a key={key} href={url} target="_blank" rel="noopener noreferrer" style={{ ...LINK_STYLE, wordBreak: 'break-word' }}>{url}</a>)
      if (trail) out.push(trail[0])
    } else {
      out.push(<em key={key}>{tok.slice(1, -1)}</em>)
    }
    last = m.index + tok.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

function renderMarkdown(content) {
  // Small markdown-to-JSX renderer: ## / ### headings, paragraphs, - bullet lists,
  // 1. numbered lists, and inline bold, italics and links.
  const lines = content.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginTop: 40, marginBottom: 14, fontWeight: 400, color: '#1a1714' }}>
          {renderInline(line.slice(3), `h${i}`)}
        </h2>
      )
      i++
      continue
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} style={{ fontSize: 18, fontWeight: 600, marginTop: 28, marginBottom: 10, color: '#1a1714' }}>
          {renderInline(line.slice(4), `h${i}`)}
        </h3>
      )
      i++
      continue
    }

    // Bullet list: consecutive "- " or "* " lines
    if (/^\s*[-*] /.test(line)) {
      const start = i
      const items = []
      while (i < lines.length && /^\s*[-*] /.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*] /, ''))
        i++
      }
      elements.push(
        <ul key={start} style={{ paddingLeft: 22, marginBottom: 16 }}>
          {items.map((it, j) => <li key={j} style={{ fontSize: 16, lineHeight: 1.7, color: '#3a352e', marginBottom: 6 }}>{renderInline(it, `u${start}-${j}`)}</li>)}
        </ul>
      )
      continue
    }

    // Numbered list: consecutive "1. " lines
    if (/^\s*\d+\. /.test(line)) {
      const start = i
      const items = []
      while (i < lines.length && /^\s*\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\. /, ''))
        i++
      }
      elements.push(
        <ol key={start} style={{ paddingLeft: 22, marginBottom: 16 }}>
          {items.map((it, j) => <li key={j} style={{ fontSize: 16, lineHeight: 1.7, color: '#3a352e', marginBottom: 6 }}>{renderInline(it, `o${start}-${j}`)}</li>)}
        </ol>
      )
      continue
    }

    if (line.trim() === '') {
      i++
      continue
    }

    elements.push(<p key={i} style={P_STYLE}>{renderInline(line, `p${i}`)}</p>)
    i++
  }

  return elements
}

// Pulls "### Question" + answer paragraphs out of an article's "## FAQ" (or "Frequently
// Asked Questions") section, for FAQPage structured data.
function extractFaqs(content) {
  const lines = content.split('\n')
  const start = lines.findIndex(l => /^## (FAQ|Frequently Asked Questions)/i.test(l.trim()))
  if (start === -1) return []
  const faqs = []
  let cur = null
  for (let k = start + 1; k < lines.length; k++) {
    const l = lines[k]
    if (l.startsWith('## ')) break
    if (l.startsWith('### ')) {
      if (cur && cur.a.trim()) faqs.push(cur)
      cur = { q: l.slice(4).trim(), a: '' }
    } else if (cur && l.trim()) {
      cur.a += (cur.a ? ' ' : '') + l.trim()
    }
  }
  if (cur && cur.a.trim()) faqs.push(cur)
  const plain = t => t.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/^[-*] /, '')
  return faqs.map(f => ({ q: plain(f.q), a: plain(f.a) }))
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
    inLanguage: article.lang === 'es' ? 'es-US' : 'en-US',
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.benefitspath.org' },
      { '@type': 'ListItem', position: 2, name: 'Articles', item: 'https://www.benefitspath.org/articles' },
      { '@type': 'ListItem', position: 3, name: article.title, item: `https://www.benefitspath.org/articles/${article.slug}` },
    ],
  }
  const faqs = extractFaqs(article.content)
  const faqLd = faqs.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  } : null

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />

      {/* JSON-LD Structured Data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#f7f5f0', minHeight: '100vh', color: '#1a1714' }}>

        {/* Nav */}
        <nav className="topnav">
          <Link href="/" className="topnav-logo">
            <div className="topnav-mark">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <span className="topnav-word">BenefitsPath</span>
          </Link>
          <div className="topnav-links">
            <Link href="/articles" className="topnav-link topnav-opt is-on">Articles</Link>
            <Link href="/for-attorneys" className="topnav-link">For Attorneys</Link>
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
          <CertReminderSignup source={`article-${article.slug}`.slice(0, 80)} />
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
