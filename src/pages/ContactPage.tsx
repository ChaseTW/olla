import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

const topics = ['還不確定', '品牌經營與整合', '企業合作', '地方與公共合作', 'PUREMOSA 品牌合作']

export function ContactPage() {
  const location = useLocation()
  const initialTopic = useMemo(() => {
    const topic = new URLSearchParams(location.search).get('topic') ?? ''
    return topics.includes(topic) ? topic : topics[0]
  }, [location.search])
  const [status, setStatus] = useState('')

  return (
    <main id="main" className="narrative-contact">
      <section className="contact-hero page-section">
        <h1 data-reveal>下一件事，<br />為你留著位置。</h1>
        <p data-reveal>一個地方、一件產品，或一段合作。先說說你正在面對的事，以及希望一起走到哪裡。</p>
      </section>
      <section className="contact-layout page-section">
        <aside>
          <h2>從一次理解，<br />走向共同工作。</h2>
          <ol><li>初步交流</li><li>整理問題與條件</li><li>提出合作方向</li><li>確認範圍與安排</li></ol>
          <p className="small-note">接洽流程為提案。正式聯絡管道與回覆安排待團隊確認。</p>
        </aside>
        <form onSubmit={(event) => { event.preventDefault(); setStatus('欄位已確認。此為 React 遷移預覽，資料未傳送或儲存。') }}>
          <label>姓名（必填）<input name="name" autoComplete="name" required /></label>
          <label>公司／單位（必填）<input name="company" autoComplete="organization" required /></label>
          <label className="wide">電子郵件（必填）<input name="email" type="email" autoComplete="email" required /></label>
          <label className="wide">想聊哪一類合作<select name="topic" defaultValue={initialTopic}>{topics.map((topic) => <option key={topic}>{topic}</option>)}</select></label>
          <label className="wide">目前的需求（必填）<textarea name="need" required placeholder="你的現況、期待，以及希望一起完成的事。" /></label>
          <label>期望時間（選填）<input name="timing" /></label>
          <label>預算範圍（選填）<input name="budget" /></label>
          <p className="small-note wide">目前不會傳送或儲存輸入資料。正式啟用前會補上資料用途、保存與聯絡說明。</p>
          <div className="wide"><button type="submit">確認需求內容</button><p className="form-status" role="status">{status}</p></div>
        </form>
      </section>
    </main>
  )
}
