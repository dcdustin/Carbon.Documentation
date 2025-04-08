import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { HOOKS_API_URL } from '../shared/constants'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface HookParameter {
  name: string
  typeName: string
  optional: boolean
}

interface Hook {
  name: string
  fullName: string
  descriptions?: string[]
  methodSource?: string
  parameters?: HookParameter[]
  returnTypeName?: string
}

interface SearchData {
  id: string
  title: string
  titles: string[]
  text: string
  link: string
}

async function fetchData() {
  try {
    console.log('Fetching hooks data...')
    const response = await fetch(HOOKS_API_URL)
    const data = await response.json()
    
    // Create data directory if it doesn't exist
    const dataDir = path.resolve(__dirname, '../data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    // Save the raw data
    fs.writeFileSync(
      path.resolve(dataDir, 'hooks.json'),
      JSON.stringify(data, null, 2)
    )
    
    // Transform data for search index
    const searchData: SearchData[] = []
    for (const category in data) {
      if (Array.isArray(data[category])) {
        data[category].forEach((hook: Hook) => {
          if (hook && hook.name && hook.fullName) {
            searchData.push({
              id: hook.fullName,
              title: hook.name,
              titles: [category, 'Hooks'],
              text: [
                hook.descriptions?.join(' ') || '',
                hook.methodSource || '',
                hook.parameters?.map(p => `${p.name} ${p.typeName}`).join(' ') || '',
                hook.returnTypeName || ''
              ].filter(Boolean).join(' '),
              link: `/references/hooks/details?name=${encodeURIComponent(hook.fullName)}`
            })
          }
        })
      }
    }
    
    // Save the search data
    fs.writeFileSync(
      path.resolve(dataDir, 'hooks-search.json'),
      JSON.stringify(searchData, null, 2)
    )
    
    console.log('Hooks data fetched and saved successfully')
  } catch (error) {
    console.error('Error fetching hooks data:', error)
    process.exit(1)
  }
}

fetchData() 