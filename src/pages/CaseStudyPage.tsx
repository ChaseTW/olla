import { Link, useParams } from 'react-router-dom'
import { caseBySlug } from '../content/cases'
import { NotFoundPage } from './NotFoundPage'

export function CaseStudyPage() {
  const { slug = '' } = useParams()
  const item = caseBySlug.get(slug)
  if (!item) return <NotFoundPage />

  return (
    <main id="main" className="narrative-case">
      <header className="case-hero page-section">
        <nav className="breadcrumbs" aria-label="麵包屑"><Link to="/">首頁</Link><Link to="/work/">合作案例</Link><span>{item.category}</span></nav>
        <p>{item.category}</p>
        <h1>{item.title}</h1>
        <div className="case-hero__lead"><p>{item.lead}</p></div>
        <dl>
          <div><dt>屏方根的角色</dt><dd>{item.role}</dd></div>
          <div><dt>合作關係</dt><dd>{item.relationship}</dd></div>
        </dl>
      </header>
      <section className={`case-cover case-cover--${item.coverTone}`}>
        <h2>{item.coverTitle}</h2>
        <p>{item.quote}</p>
      </section>
      <div className="case-article page-section">
        <nav aria-label="案例目錄">
          {item.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.title}>{String(index + 1).padStart(2, '0')}　{section.title}</a>)}
        </nav>
        <article>
          {item.sections.map((section, index) => (
            <section id={`section-${index + 1}`} data-reveal key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              {index === 1 ? <blockquote>{item.quote}</blockquote> : null}
            </section>
          ))}
        </article>
      </div>
      <section className="page-next page-section">
        <h2>你的團隊，<br />也有相近的問題嗎？</h2>
        <div><p>可以從你的單位、目前的需求，以及想一起完成的方向開始。</p><Link className="button-link" to={`/contact/?topic=${encodeURIComponent(item.contactTopic)}`}>從這個案例聊合作</Link></div>
      </section>
    </main>
  )
}
