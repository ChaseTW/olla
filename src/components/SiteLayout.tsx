import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { getRouteMetadata } from '../app/metadata'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

function useDocumentEffects() {
  const location = useLocation()

  useEffect(() => {
    const metadata = getRouteMetadata(location.pathname)
    document.title = metadata.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description)
    if (!location.hash) window.scrollTo({ top: 0 })

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [location.hash, location.pathname])
}

export function SiteLayout() {
  useDocumentEffects()
  return (
    <>
      <a className="skip-link" href="#main">跳到主要內容</a>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  )
}
