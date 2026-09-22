import { access, readFile, readdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const output = join(root, 'dist-react')
const requiredRoutes = [
  '', 'about', 'services', 'work', 'work/puremosa', 'work/gift',
  'work/mangzhong', 'work/erfeng', 'contact', 'events/mangzhong-2026-0605',
]

const errors = []

async function exists(path) {
  try { await access(path); return true } catch { return false }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await walk(path))
    else files.push(path)
  }
  return files
}

for (const route of requiredRoutes) {
  const file = join(output, route, 'index.html')
  if (!await exists(file)) errors.push(`missing route: /${route}`)
}

if (await exists(join(output, 'journal'))) errors.push('journal must not be included in the MVP')
if (await exists(join(output, 'events/mangzhong-2026-0605/index.original.html'))) errors.push('campaign source backup leaked into build')

const files = await walk(output)
const htmlFiles = files.filter((file) => file.endsWith('.html'))
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8')
  if (!html.includes('<h1')) errors.push(`missing h1: ${file.slice(output.length)}`)
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1])
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index)
  if (duplicates.length) errors.push(`duplicate ids in ${file.slice(output.length)}: ${[...new Set(duplicates)].join(', ')}`)
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const reference = match[1]
    const target = reference.endsWith('/') ? join(output, reference, 'index.html') : join(output, reference)
    if (!await exists(target)) errors.push(`broken reference ${reference} in ${file.slice(output.length)}`)
  }
}

for (const file of ['index.html', 'styles.css', 'app.js']) {
  const source = await readFile(join(root, '0605/events/mangzhong-2026-0605', file))
  const built = await readFile(join(output, 'events/mangzhong-2026-0605', file))
  if (!source.equals(built)) errors.push(`campaign file changed: ${file}`)
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Validated ${requiredRoutes.length} routes, ${htmlFiles.length} HTML files, local references, IDs, and campaign parity.`)
