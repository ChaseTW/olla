import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outputDir = join(root, 'dist-react')
const sourceDir = join(root, '0605')
const serverEntry = pathToFileURL(join(root, '.react-ssr', 'entry-server.js')).href
const { render, prerenderRoutes } = await import(serverEntry)

async function copyStaticFiles() {
  await cp(join(root, 'src', 'assets', 'favicon.svg'), join(outputDir, 'favicon.svg'))
  await cp(join(sourceDir, 'penfungo-assets'), join(outputDir, 'penfungo-assets'), { recursive: true })
  await cp(join(sourceDir, 'events', 'mangzhong-2026-0605'), join(outputDir, 'events', 'mangzhong-2026-0605'), {
    recursive: true,
    filter: (source) => !source.endsWith('index.original.html'),
  })
  for (const file of ['_redirects', 'robots.txt', 'sitemap.xml']) {
    await cp(join(sourceDir, file), join(outputDir, file))
  }
  const headers = await readFile(join(sourceDir, '_headers'), 'utf8')
  await writeFile(
    join(outputDir, '_headers'),
    `${headers.trim()}\n\n# React build assets: content-hashed and immutable\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n`,
  )
}

function inject(template, url) {
  const { html, metadata } = render(url)
  return template
    .replace(/<title>.*?<\/title>/, `<title>${metadata.title}</title>`)
    .replace('<!--app-head-->', `<meta name="description" content="${metadata.description}">`)
    .replace('<!--app-html-->', html)
}

await copyStaticFiles()
const template = await readFile(join(outputDir, 'index.html'), 'utf8')

for (const route of prerenderRoutes) {
  const target = route === '/' ? join(outputDir, 'index.html') : join(outputDir, route.slice(1), 'index.html')
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, inject(template, route))
}

await writeFile(join(outputDir, '404.html'), inject(template, '/not-found/'))

console.log(`Prerendered ${prerenderRoutes.length} brand routes and preserved the campaign page.`)
