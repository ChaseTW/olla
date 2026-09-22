import { type FormEvent, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

const topics = ['還不確定', '品牌經營與整合', '企業合作', '地方與公共合作', 'PUREMOSA 品牌合作']

export function ContactPage() {
  const location = useLocation()
  const initialTopic = useMemo(() => {
    const topic = new URLSearchParams(location.search).get('topic') ?? ''
    return topics.includes(topic) ? topic : topics[0]
  }, [location.search])
  const [status, setStatus] = useState('')

  async function copyBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const summary = [
      `姓名：${data.get('name') ?? ''}`,
      `公司／單位：${data.get('company') ?? ''}`,
      `電子郵件：${data.get('email') ?? ''}`,
      `合作方向：${data.get('topic') ?? ''}`,
      `目前需求：${data.get('need') ?? ''}`,
      `期望時間：${data.get('timing') || '未填寫'}`,
      `預算範圍：${data.get('budget') || '未填寫'}`,
    ].join('\n')

    try {
      await navigator.clipboard.writeText(summary)
      setStatus('需求摘要已複製，可以貼到你慣用的聯絡管道。')
    } catch {
      setStatus('瀏覽器未允許自動複製，請選取欄位內容後手動複製。')
    }
  }

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
          <p className="small-note">每次合作的步調不同，我們會先理解現況，再一起確認適合的範圍。</p>
        </aside>
        <form onSubmit={copyBrief}>
          <label>姓名（必填）<input name="name" autoComplete="name" required /></label>
          <label>公司／單位（必填）<input name="company" autoComplete="organization" required /></label>
          <label className="wide">電子郵件（必填）<input name="email" type="email" autoComplete="email" required /></label>
          <label className="wide">想聊哪一類合作<select name="topic" defaultValue={initialTopic}>{topics.map((topic) => <option key={topic}>{topic}</option>)}</select></label>
          <label className="wide">目前的需求（必填）<textarea name="need" required placeholder="你的現況、期待，以及希望一起完成的事。" /></label>
          <label>期望時間（選填）<input name="timing" /></label>
          <label>預算範圍（選填）<input name="budget" /></label>
          <p className="small-note wide">填寫內容只留在這個頁面，不會自動上傳。完成後可複製成一段清楚的合作摘要。</p>
          <div className="wide"><button type="submit">複製需求摘要</button><p className="form-status" role="status">{status}</p></div>
        </form>
      </section>
    </main>
  )
}
