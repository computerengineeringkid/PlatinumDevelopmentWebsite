import fs from 'node:fs'
import {defineCliConfig} from 'sanity/cli'

type LocalClientConfig = {
  projectId?: string
  dataset?: string
}

function loadLocalClientConfig(): LocalClientConfig | undefined {
  try {
    const configUrl = new URL('../sanity-client-config.json', import.meta.url)
    if (!fs.existsSync(configUrl)) {
      return undefined
    }
    const raw = fs.readFileSync(configUrl, 'utf8')
    if (!raw.trim()) {
      return undefined
    }
    return JSON.parse(raw) as LocalClientConfig
  } catch (error) {
    console.warn('Failed to load sanity-client-config.json:', error)
    return undefined
  }
}

const localConfig = loadLocalClientConfig()

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || localConfig?.projectId
const dataset = process.env.SANITY_STUDIO_DATASET || localConfig?.dataset

if (!projectId) {
  throw new Error(
    'Missing SANITY_STUDIO_PROJECT_ID environment variable. ' +
      'Set it or create a sanity-client-config.json with projectId/dataset values.'
  )
}

if (!dataset) {
  throw new Error(
    'Missing SANITY_STUDIO_DATASET environment variable. ' +
      'Set it or create a sanity-client-config.json with projectId/dataset values.'
  )
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
})
