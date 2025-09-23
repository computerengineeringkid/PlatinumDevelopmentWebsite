import {createRequire} from 'module'
import {defineCliConfig} from 'sanity/cli'

const require = createRequire(import.meta.url)

let localProjectId: string | undefined
let localDataset: string | undefined

try {
  const cfg = require('../client-config.js') as {
    projectId?: string
    dataset?: string
    default?: {projectId?: string; dataset?: string}
    sanityConfig?: {projectId?: string; dataset?: string}
  }
  const resolved = cfg.sanityConfig || cfg.default || cfg
  localProjectId = resolved.projectId
  localDataset = resolved.dataset
} catch (error) {
  // No local override present; rely on env vars instead.
}

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || localProjectId
const dataset = process.env.SANITY_STUDIO_DATASET || localDataset

if (!projectId) {
  throw new Error(
    'Missing SANITY_STUDIO_PROJECT_ID environment variable. ' +
      'Set it or create a client-config.js with projectId/dataset values.'
  )
}

if (!dataset) {
  throw new Error(
    'Missing SANITY_STUDIO_DATASET environment variable. ' +
      'Set it or create a client-config.js with projectId/dataset values.'
  )
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
})
