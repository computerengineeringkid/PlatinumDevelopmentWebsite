import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'

import deskStructure, {defaultDocumentNode} from './structure/deskStructure'
import schemaTypes from './schemaTypes'

type ClientConfigModule = {
  projectId?: string
  dataset?: string
  default?: {projectId?: string; dataset?: string}
  sanityConfig?: {projectId?: string; dataset?: string}
}

async function loadLocalClientConfig(): Promise<{
  projectId?: string
  dataset?: string
} | undefined> {
  try {
    const module = (await import('../client-config.js')) as ClientConfigModule
    return module.sanityConfig || module.default || module
  } catch (error) {
    // Optional client-config.js not found; ignore
    return undefined
  }
}

function readEnvVariable(key: 'SANITY_STUDIO_PROJECT_ID' | 'SANITY_STUDIO_DATASET') {
  if (typeof process !== 'undefined' && process.env?.[key]) {
    return process.env[key]
  }

  if (typeof import.meta !== 'undefined') {
    const env = (import.meta as {env?: Record<string, string | undefined>}).env
    if (env?.[key]) {
      return env[key]
    }
  }

  return undefined
}

const localConfig = await loadLocalClientConfig()

const projectId = readEnvVariable('SANITY_STUDIO_PROJECT_ID') || localConfig?.projectId
const dataset = readEnvVariable('SANITY_STUDIO_DATASET') || localConfig?.dataset

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

export default defineConfig({
  name: 'platinum_development_studio',
  title: 'Platinum Development Studio',
  projectId,
  dataset,
  plugins: [
    deskTool({
      structure: deskStructure,
      defaultDocumentNode,
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
