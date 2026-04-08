import Link from 'next/link'
import { getAllArticles } from './data/articles'

export const metadata = {
  title: 'Unemployment Benefits Articles & Guides | BenefitsPath',
  description: 'Expert guides on unemployment benefits, appeals, eligibility, and employment law. Free resources to help you understand your rights and navigate the system.',
  openGraph: {
    title: 'Unemployment Benefits Articles & Guides | BenefitsPath',
    description: 'Expert guides on unemployment benefits, appeals, eligibility, and employment law.',
    type: 'website',
    url: 'https://www.benefitspath.org/articles',
  },
}

export default function ArticlesPage() {
  const articles = getAllArticles()

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />
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
            <Link href="/for-attorneys" style={{ fontSize: 14, color: '#5a524a', textDecoration: 'none', fontWeight: 500 }}>Find a Lawyer</Link>
            <Link href="/" style={{ background: '#2d6a4f', color: '#fff', padding: '8px 18px', borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Check Eligibility →</Link>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ background: '#2d6a4f', color: '#fff', padding: '48px 24px 56px', textAlign: 'center' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.2, marginBottom: 16, fontWeight: 400 }}>
              Guides & Resources
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, opacity: 0.9, maxWidth: 480, margin: '0 auto' }}>
              Expert articles on unemployment benefits, appeals, eligibility, and your employment rights.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div style={{ maxWidth: 880, margin: '0 auto', padding: '48px 24px' }}>
          {articles.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#5a524a', fontSize: 16 }}>New articles coming soon.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <article style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: 28,
                    border: '1px solid #e5e0d8',
                    transition: 'box-shadow 0.2s, border-color 0.2s',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
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
                    <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, lineHeight: 1.3, marginBottom: 10, fontWeight: 400 }}>
                      {article.title}
                    </h2>
                    <p style={{ fontSize: 15, color: '#5a524a', lineHeight: 1.6, flex: 1 }}>
                      {article.description}
                    </p>
                    <div style={{ marginTop: 16, fontSize: 13, color: '#8a8078' }}>
                      {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{ background: '#fff', borderTop: '1px solid #e5e0d8', padding: '48px 24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 10 }}>Need legal help with your claim?</h2>
          <p style={{ color: '#5a524a', marginBottom: 24, fontSize: 15, maxWidth: 480, margin: '0 auto 24px' }}>
            Connect with an experienced employment attorney in your state through our free directory.
          </p>
          <Link href="/" style={{ display: 'inline-block', background: '#2d6a4f', color: '#fff', padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
            Check Your Eligibility →
          </Link>
        </div>

        {/* Footer */}
        <div style={{ background: '#1a1714', padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#5a524a', fontSize: 13 }}>© 2025 BenefitsPath. <Link href="/" style={{ color: '#5a524a' }}>Back to homepage</Link></p>
        </div>
      </div>
    </>
  )
}
