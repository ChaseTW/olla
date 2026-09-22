import { Link } from 'react-router-dom'
import { caseStudies } from '../content/cases'

const flow = [
  ['地方條件', '水、風、材料、產業與生活，不是風景背景，而是每個決定的起點。'],
  ['人的判斷', '讓工作者說出哪些細節最容易被忽略，哪些選擇不能被簡化。'],
  ['共同工作', '清楚交代誰提出問題、誰參與製作、如何取捨，而不是把成果都歸給品牌。'],
  ['接續使用', '活動之後留下訪談、方法、反思與可公開材料，成為下一次合作的基礎。'],
]

export function WorkPage() {
  return (
    <main id="main" className="narrative-work">
      <section className="river-hero">
        <div className="river-hero__blue">
          <p>合作案例<br />從屏東出發</p>
          <h1>合作有其脈絡</h1>
          <span>沿著需求、選擇與參與者，理解一件合作如何發生。</span>
        </div>
        <figure>
          <img src="/penfungo-assets/worktable-wide.jpg" alt="一雙手在明暗交界的工作桌上整理材料與紙張" width="1536" height="1024" fetchPriority="high" />
          <figcaption><strong>不只看見成果</strong>也看見它如何被照料、如何被做成。</figcaption>
        </figure>
      </section>
      <nav className="river-index" aria-label="內容索引">
        {flow.map(([title]) => <a href="#flow" key={title}><i />{title}</a>)}
      </nav>
      <section className="work-manifesto page-section">
        <h2 data-reveal>每個合作，<span>都有自己的理由。</span></h2>
        <div data-reveal><p>品牌經營、企業合作與公共專案，有不同的起點。先理解原本的問題，再看屏方根如何參與，以及哪些選擇由夥伴共同完成。</p><blockquote>成果讓人看見，過程讓人理解。</blockquote></div>
      </section>
      <section className="river-flow page-section" id="flow">
        <div className="river-flow__intro" data-reveal><h2>從問題，走到合作</h2><p>從地方條件開始，經過人的判斷和共同工作，最後留下能繼續使用的知識。</p></div>
        <div className="river-flow__list">
          {flow.map(([title, body]) => <article data-reveal key={title}><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>
      <section className="case-index page-section">
        <header><h2>合作的不同樣貌</h2><p>企業委託、品牌餐飲與地方公共合作，各有自己的目的，也各有需要交代清楚的角色。</p></header>
        <div className="case-index__grid">
          {caseStudies.map((item, index) => (
            <article className={`case-record case-record--${item.coverTone}`} data-reveal key={item.slug}>
              <p>{item.category}</p>
              <h3>{item.title}</h3>
              <span>{item.lead}</span>
              <Link className="text-link" to={`/work/${item.slug}/`}>看合作脈絡</Link>
              <b aria-hidden="true">{String(index + 1).padStart(2, '0')}</b>
            </article>
          ))}
        </div>
      </section>
      <section className="page-next page-section">
        <h2>沿著地方，<br />走到下一件事。</h2>
        <div><p>如果你有一件產品、一個地方或一段合作正在發生，我們可以先把真正重要的部分找出來。</p><Link className="button-link" to="/contact/">開始一段對話</Link></div>
      </section>
    </main>
  )
}
