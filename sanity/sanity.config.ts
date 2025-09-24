import fs from 'node:fs'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'

import deskStructure, {defaultDocumentNode} from './structure/deskStructure'
import schemaTypes from './schemaTypes'

type LocalClientConfig = {
  projectId?: string
  dataset?: string
}

function isPlaceholder(value: string | undefined) {
  if (!value) {
    return true
  }

  const normalized = value.trim().toLowerCase()
  return normalized === 'yourprojectid' || normalized === 'yourdataset'
}

function loadLocalClientConfig(): LocalClientConfig | undefined {
  const configFiles = [
    {path: '../sanity-client-config.json', label: 'sanity-client-config.json'},
    {path: '../sanity-client-config.example.json', label: 'sanity-client-config.example.json'},
  ] as const

  for (const {path, label} of configFiles) {
    try {
      const configUrl = new URL(path, import.meta.url)
      if (!fs.existsSync(configUrl)) {
        continue
      }

      const raw = fs.readFileSync(configUrl, 'utf8')
      if (!raw.trim()) {
        continue
      }

      const parsed = JSON.parse(raw) as LocalClientConfig
      if (isPlaceholder(parsed.projectId) || isPlaceholder(parsed.dataset)) {
        continue
      }

      return parsed
    } catch (error) {
      console.warn(`Failed to load ${label}:`, error)
    }
  }

  return undefined
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

const localConfig = loadLocalClientConfig()

const projectId = readEnvVariable('SANITY_STUDIO_PROJECT_ID') || localConfig?.projectId
const dataset = readEnvVariable('SANITY_STUDIO_DATASET') || localConfig?.dataset

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
