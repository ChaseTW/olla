import { Link } from 'react-router-dom'

const services = [
  {
    title: '品牌建構與發展',
    intro: '產品、場域與服務已有內容，卻還缺少共同主軸。我們從定位與核心價值出發，整理它們之間的關係。',
    items: ['理解品牌現況與受眾', '梳理核心價值與表達主軸', '建立產品、服務與合作的發展架構'],
    link: '/work/puremosa/',
    label: '從 PUREMOSA 看品牌實踐',
  },
  {
    title: '品牌轉譯與跨域合作',
    intro: '讓企業、地方與公共夥伴理解彼此的價值，形成可以對接的合作方向。',
    items: ['釐清合作目的與各方需求', '整理對外說法與提案架構', '理解角色、資源與執行邊界'],
    link: '/work/',
    label: '看不同合作的脈絡',
  },
]

export function ServicesPage() {
  return (
    <main id="main" className="narrative-services">
      <section className="service-hero page-section">
        <p data-reveal>合作不是套用方案，<br />而是先把條件攤開。</p>
        <h1 data-reveal>你帶著一件事來，<br />我們一起找到它的根。</h1>
        <figure data-reveal><img src="/penfungo-assets/worktable-wide.jpg" alt="工作桌上的紙張、器皿與植物材料" width="1536" height="1024" fetchPriority="high" /></figure>
      </section>
      <section className="service-list page-section">
        {services.map((service) => (
          <article data-reveal key={service.title}>
            <h2>{service.title}</h2>
            <div>
              <p>{service.intro}</p>
              <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
              <Link className="text-link" to={service.link}>{service.label}</Link>
            </div>
          </article>
        ))}
      </section>
      <section className="service-method page-section">
        <h2 data-reveal>方法是一連串<br />需要說清楚的判斷。</h2>
        <div data-reveal>
          <p>辨識斷裂、釐清價值、建立架構、轉譯對接。從現況開始，整理共同問題，再走向具體合作。</p>
          <ol><li>辨識斷裂</li><li>釐清價值</li><li>建立架構</li><li>轉譯對接</li></ol>
        </div>
      </section>
      <section className="service-faq page-section">
        <h2>合作之前，可以先知道的事。</h2>
        <div>
          <details><summary>還沒有完整企劃，也能開始討論嗎？</summary><p>可以先整理目前的現況、希望改變的問題，以及你所在的單位。合作範圍依初步交流再確認。</p></details>
          <details><summary>如何確認每個夥伴的分工？</summary><p>依個案需求說明屏方根、委託方與製作夥伴的責任；資源對接不等於補助、採購或標案結果的保證。</p></details>
          <p className="small-note">服務名稱與接洽說明為網站文案提案，正式承接內容依團隊確認。</p>
        </div>
      </section>
      <section className="page-next page-section">
        <h2>先從你正在<br />面對的事開始。</h2>
        <div><p>不必把問題整理成完美的提案，先把重要的部分帶到桌上。</p><Link className="button-link" to="/contact/">聊聊合作</Link></div>
      </section>
    </main>
  )
}
