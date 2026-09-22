import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './app/App'
import { getRouteMetadata, prerenderRoutes } from './app/metadata'
import './styles/index.css'

export { prerenderRoutes }

export function render(url: string) {
  const pathname = new URL(url, 'https://penfungo.com').pathname
  return {
    html: renderToString(<StaticRouter location={url}><App /></StaticRouter>),
    metadata: getRouteMetadata(pathname),
  }
}
