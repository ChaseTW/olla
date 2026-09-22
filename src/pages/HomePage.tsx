import { Link } from 'react-router-dom'

const seats = [
  {
    role: '地方工作者',
    title: '帶來材料、技術與生活裡的判斷',
    body: '哪一個步驟不能快？哪一種說法容易誤解？讓真正做事的人先說。',
    voice: '我希望你看見的，不只是一件完成品。',
    image: '/penfungo-assets/work-process-portrait.jpg',
    alt: '工作者正在整理材料與手寫紀錄',
    width: 1152,
    height: 1440,
  },
  {
    role: '品牌與企業',
    title: '帶來資源，也說清楚想一起完成什麼',
    body: '合作不是把地方當素材庫，而是共同找到產品、溝通與長期關係的可能。',
    voice: '資源進來，也要讓價值留下。',
    image: '/penfungo-assets/worktable-wide.jpg',
    alt: '桌面上的包裝試作、紙張與植物材料',
    width: 1536,
    height: 1024,
  },
  {
    role: '公部門與組織',
    title: '讓公共目的和現場條件互相聽見',
    body: '把政策語言轉回生活問題，也把地方需求整理成可以協作與執行的方式。',
    voice: '一場活動之後，還能留下下一步。',
    image: '/penfungo-assets/work-process-portrait.jpg',
    alt: '光影交界中，雙手把材料放入陶碗',
    width: 1152,
    height: 1440,
  },
  {
    role: '屏方根',
    title: '提問、整理、轉譯，再陪事情走一段',
    body: '不搶走地方的聲音；讓資訊變清楚，讓合作看見彼此，也讓知識回到可接續的位置。',
    voice: '我們不站在桌子的正中央。',
    image: '/penfungo-assets/worktable-wide.jpg',
    alt: '有人在工作桌邊閱讀並整理地方資料',
    width: 1536,
    height: 1024,
  },
]

export function HomePage() {
  return (
    <main id="main" className="narrative-home">
      <section className="home-hero">
        <img className="home-hero__image" src="/penfungo-assets/worktable-wide.jpg" alt="明亮庭院旁的工作桌，一雙手正在整理材料與手寫紀錄" width="1536" height="1024" fetchPriority="high" />
        <div className="home-hero__veil" />
        <div className="home-hero__content">
          <h1 data-reveal>在地方，<br />留一個位置。</h1>
          <div className="home-hero__side" data-reveal>
            <p>坐近一點，才看得見一件事如何被做成；談久一點，才知道哪些地方不能被省略。</p>
            <span className="seat-mark">屏方根，和人一起把事情做好</span>
            <Link className="text-link text-link--light" to="/work/">從合作案例認識我們</Link>
          </div>
        </div>
        <p className="home-hero__ribbon">屏東・品牌經營與整合</p>
      </section>

      <section className="home-intro page-section">
        <p className="home-intro__vertical">一起把事情做好</p>
        <div data-reveal>
          <h2>我們把桌子打開，讓不同的人帶著自己的知識坐進來。</h2>
          <p>品牌、企業、公部門與地方工作者，不需要變成同一種聲音。屏方根做的，是找出共同要處理的問題，讓角色、選擇與投入被清楚看見。</p>
        </div>
        <p className="home-intro__note">留白不是把地方清空，而是為具體的人留下被理解的位置。</p>
      </section>

      <section className="long-table">
        <header data-reveal>
          <h2>一張桌子，四種位置</h2>
          <p>每一次合作，都從坐在不同位置上的人開始。</p>
        </header>
        <div className="long-table__rows">
          {seats.map((seat, index) => (
            <article className="table-seat" data-reveal key={seat.role}>
              <figure><img src={seat.image} alt={seat.alt} width={seat.width} height={seat.height} loading="lazy" /></figure>
              <div className="table-seat__copy">
                <small>{seat.role}</small>
                <h3>{seat.title}</h3>
                <p>{seat.body}</p>
              </div>
              <blockquote className="table-seat__voice">{seat.voice}</blockquote>
              <span className="table-seat__index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="home-work page-section">
        <p className="home-work__ghost" aria-hidden="true">接續</p>
        <h2 data-reveal>一起做的事，值得被好好理解。</h2>
        <div className="home-work__links" data-reveal>
          <p>從自有品牌的經營，到企業與地方的合作。先從一件具體的事，認識我們如何把想法帶進真實的條件裡。</p>
          <Link to="/work/puremosa/"><strong>PUREMOSA</strong><span>自有品牌實踐</span></Link>
          <Link to="/work/gift/"><strong>企業客製禮盒</strong><span>企業合作</span></Link>
          <Link to="/work/"><strong>合作案例全覽</strong><span>讀過程與角色</span></Link>
        </div>
      </section>

      <section className="home-closing page-section">
        <h2 data-reveal>下一件事，<br />為你留著位置。</h2>
        <div data-reveal>
          <p>如果你有一個地方、一件產品或一段合作正在發生，我們可以先坐下來，把真正重要的部分說清楚。</p>
          <Link className="text-link" to="/contact/">談談正在發生的事</Link>
        </div>
      </section>
    </main>
  )
}
