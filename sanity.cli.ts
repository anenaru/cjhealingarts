import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'a67qw9j5',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  },
  deployment: {
    appId: 'ndapcrio0s844yebdyb4pjqx',
  },
})
