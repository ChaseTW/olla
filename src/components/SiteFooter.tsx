import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__identity">
        <strong>屏方根 PenFunGo</strong>
        <span>屏東・品牌經營與整合・企業與公共合作</span>
      </div>
      <nav aria-label="頁尾導覽">
        <Link to="/about/">關於我們</Link>
        <Link to="/work/">合作案例</Link>
        <Link to="/contact/">聊聊合作</Link>
      </nav>
    </footer>
  )
}
