import { Link } from 'react-router-dom'

const principles = [
  ['有光，也有蔭', '明亮之外，也看見屋簷、樹影、雨後和工作的室內。溫暖不是把畫面調黃，而是讓人被好好接待。', '感受不是濾鏡，是觀看的位置。'],
  ['有物產，也有工序', '一件作品的價值，來自材料、反覆測試與人的判斷。我們把完成品背後容易被忽略的工作說清楚。', '從結果往回走，看見怎麼做成。'],
  ['有相遇，也有差異', '合作不是把所有人揉成匿名的「在地」。每一位參與者都有名字、角色、觀點，也有不能被省略的界線。', '具名，是尊重的開始。'],
  ['有傳承，也有當代', '文化不是停在過去的展示品。它持續被使用、創作、重新理解，也因此保有往下一段路前進的力量。', '留下脈絡，也留下改變的空間。'],
]

export function AboutPage() {
  return (
    <main id="main" className="narrative-about">
      <section className="about-hero page-section">
        <div className="about-hero__copy" data-reveal>
          <h1>走近一點，<span>認識屏方根。</span></h1>
          <p>從屏東出發，在品牌、地方與人的關係之間工作。我們的理解，從一張桌子上的材料與討論開始。</p>
          <small>品牌經營與整合・企業合作・政府媒合</small>
        </div>
        <figure data-reveal>
          <img src="/penfungo-assets/role-penfungo.jpg" alt="工作者在日光裡整理地方照片、材料與關係圖" width="1024" height="1536" fetchPriority="high" />
          <figcaption>從地方觀察開始，整理出可以共同工作的方向。</figcaption>
        </figure>
      </section>

      <section className="about-thesis page-section">
        <div className="about-thesis__title">
          <p>我們如何理解屏東</p>
          <h2 data-reveal>不是一張南國海報，而是地方如何被<span>照料</span>。</h2>
        </div>
        <div className="about-thesis__list">
          {principles.map(([title, body, note]) => (
            <article data-reveal key={title}>
              <h3>{title}</h3>
              <div><p>{body}</p><small>{note}</small></div>
            </article>
          ))}
        </div>
      </section>

      <section className="workbench page-section">
        <figure data-reveal>
          <img src="/penfungo-assets/role-maker.jpg" alt="地方工作者在遮蔭的桌邊整理種子、纖維與植物材料" width="1024" height="1536" loading="lazy" />
          <figcaption>材料會留下痕跡，人的判斷也應該被看見。</figcaption>
        </figure>
        <div className="workbench__copy" data-reveal>
          <p>一次合作，從一個好問題開始</p>
          <h2>看見一件事，<br />怎麼被做成。</h2>
          <blockquote>哪一個判斷，最容易被外人忽略？</blockquote>
          <p>我們從這個問題進入：找出真正參與的人，理解材料和限制，讓品牌、企業與公部門之間的合作不只留下活動照片，也留下可以接續的方法。</p>
          <Link className="text-link text-link--light" to="/services/">認識合作方式</Link>
        </div>
      </section>

      <section className="practice page-section">
        <header data-reveal>
          <h2>方法走進市場，<br />觀察回到工作桌。</h2>
          <p>屏方根整理品牌價值與合作架構；PUREMOSA 讓方法進入產品與體驗。兩者的經驗相互回應。</p>
        </header>
        <div className="practice__stage">
          <article data-reveal>
            <small>自有品牌經營</small>
            <h3>PUREMOSA<br />風味與地方的練習</h3>
            <p>從風味選擇、品牌語言到合作關係，建立能被說清楚、也能持續調整的品牌方法。</p>
            <Link className="text-link" to="/work/puremosa/">讀品牌實踐</Link>
          </article>
          <aside data-reveal>
            <small>屏方根與 PUREMOSA</small>
            <h3>在實踐裡，讓方法被重新提問。</h3>
            <p>品牌不是一次性的說法。產品選擇、合作過程與市場觀察，持續帶來下一個需要理解的問題。</p>
          </aside>
        </div>
      </section>

      <section className="page-next page-section">
        <h2 data-reveal>你正在做的事，值得被好好理解。</h2>
        <div data-reveal><p>如果你有一個地方、一件產品或一段合作正在發生，我們可以先從釐清它真正重要的部分開始。</p><Link className="button-link" to="/contact/">談談這件事</Link></div>
      </section>
    </main>
  )
}
