import { caseBySlug } from '../content/cases'

export type RouteMetadata = {
  title: string
  description: string
}

const metadataByPath: Record<string, RouteMetadata> = {
  '/': {
    title: '屏方根｜在地方，留一個位置',
    description: '屏方根從屏東出發，連結品牌、地方與合作。',
  },
  '/about/': {
    title: '屏方根｜關於我們｜從一張工作桌開始',
    description: '從屏東出發，在品牌、地方與人的關係之間工作。',
  },
  '/services/': {
    title: '合作方式｜先理解正在面對的問題｜屏方根',
    description: '品牌發展、企業合作，以及地方與公共計畫的合作方式。',
  },
  '/work/': {
    title: '屏方根｜合作案例｜每個合作都有自己的理由',
    description: '沿著需求、選擇與參與者，理解一件合作如何發生。',
  },
  '/contact/': {
    title: '聊聊合作｜為下一件事留一個位置｜屏方根',
    description: '一個地方、一件產品，或一段合作。先說說你正在面對的事。',
  },
}

export function normalizePath(pathname: string) {
  if (pathname === '/') return pathname
  return pathname.endsWith('/') ? pathname : `${pathname}/`
}

export function getRouteMetadata(pathname: string): RouteMetadata {
  const path = normalizePath(pathname)
  const caseMatch = path.match(/^\/work\/([^/]+)\/$/)
  if (caseMatch) {
    const item = caseBySlug.get(caseMatch[1])
    if (item) {
      return {
        title: `${item.title}｜合作案例｜屏方根`,
        description: item.lead,
      }
    }
  }
  return metadataByPath[path] ?? {
    title: '找不到頁面｜屏方根',
    description: '這個位置目前沒有內容，請回到屏方根首頁。',
  }
}

export const prerenderRoutes = [
  '/',
  '/about/',
  '/services/',
  '/work/',
  '/work/puremosa/',
  '/work/gift/',
  '/work/mangzhong/',
  '/work/erfeng/',
  '/contact/',
]
