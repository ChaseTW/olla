import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main id="main" className="not-found page-section">
      <p>404</p>
      <h1>這個位置，現在是空的。</h1>
      <span>地方筆記尚未公開，或你走到了一個不存在的網址。</span>
      <Link className="button-link" to="/">回到首頁</Link>
    </main>
  )
}
