import { App } from 'sst/constructs/App'
import { PalqeeNextjsWebAppStack } from './apps/infra/dashboard'
import { SSTConfig } from 'sst'
import { config } from 'dotenv-flow'

config({
  path: './config/',
  node_env: process.env.NEXT_PUBLIC_BUILD_ENV,
})

export default {
  config(_input) {
    return {
      ..._input,
      name: 'pq',
      stage: process.env.NEXT_PUBLIC_BUILD_ENV,
      region: process.env.AWS_REGION,
    }
  },
  stacks(app: App) {
    app.setDefaultFunctionProps({
      runtime: 'nodejs18.x',
    })

    app.stack(PalqeeNextjsWebAppStack, { id: 'test' })
  },
} as SSTConfig
