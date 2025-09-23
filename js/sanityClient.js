import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const importMetaEnv = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};
const processEnv = typeof process !== 'undefined' && process.env ? process.env : {};
const windowEnv = typeof window !== 'undefined' ? window : {};

const projectId = importMetaEnv.VITE_SANITY_PROJECT_ID || processEnv.SANITY_PROJECT_ID || windowEnv.SANITY_PROJECT_ID || '';
const dataset = importMetaEnv.VITE_SANITY_DATASET || processEnv.SANITY_DATASET || windowEnv.SANITY_DATASET || '';
const apiToken = importMetaEnv.VITE_SANITY_API_TOKEN || processEnv.SANITY_API_TOKEN || windowEnv.SANITY_API_TOKEN || '';

let client = null;

if (!projectId || !dataset) {
  console.warn('Sanity project configuration is missing. Ensure SANITY_PROJECT_ID and SANITY_DATASET are defined.');
} else {
  client = createClient({
    projectId,
    dataset,
    apiVersion: '2023-10-01',
    token: apiToken || undefined,
    useCdn: !apiToken,
    perspective: 'published'
  });
}

const builder = client ? imageUrlBuilder(client) : null;

export const sanityClient = client;

export function urlForImage(source) {
  if (!builder || !source) {
    return null;
  }

  return builder.image(source);
}
