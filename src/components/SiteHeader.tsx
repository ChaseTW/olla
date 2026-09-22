import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navigation = [
  { to: '/', label: '首頁', end: true },
  { to: '/services/', label: '合作方式' },
  { to: '/work/', label: '合作案例' },
  { to: '/about/', label: '關於我們' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        document.querySelector<HTMLButtonElement>('.site-menu')?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="site-header">
      <Link className="site-brand" to="/" aria-label="屏方根首頁">
        <span className="site-brand__mark" aria-hidden="true"><i /><i /><i /><i /></span>
        <span>屏方根 <small>PenFunGo</small></span>
      </Link>
      <button
        className="site-menu"
        type="button"
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? '關閉' : '選單'}
      </button>
      <nav className={`site-nav${open ? ' is-open' : ''}`} id="site-navigation" aria-label="主要導覽">
        {navigation.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end}>
            {item.label}
          </NavLink>
        ))}
        <NavLink className="site-nav__contact" to="/contact/">聊聊合作</NavLink>
      </nav>
    </header>
  )
}
