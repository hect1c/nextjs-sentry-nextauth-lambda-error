import { setEnvironmentVariables } from './utils'

import { NextjsSite } from 'sst/constructs'
import { StackContext } from 'sst/constructs/FunctionalStack'

export function PalqeeNextjsWebAppStack(props: StackContext) {
  const { stack } = props

  const site = new NextjsSite(stack, 'nextjs-test', {
    path: 'apps/dashboard',
    environment: setEnvironmentVariables(),
    timeout: Number(process.env.AWS_LAMBDA_EDGE_TIMEOUT),
    memorySize: Number(process.env.AWS_LAMBDA_EDGE_MEMORY_SIZE),
    edge: true,
  })

  stack.addDefaultFunctionPermissions('*')

  stack.addOutputs({
    URL: site.url,
  })
}
