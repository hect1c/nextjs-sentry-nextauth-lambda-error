import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import { Stack } from 'sst/constructs'

export const domainRouting = (stack: Stack, props?: { prefix?: string }) => {
  const hostedZone = 'palqee.com'

  const domainName = `${props?.prefix}.${hostedZone}`

  return {
    customDomain: {
      domainName,
      hostedZone,
      cdk: {
        certificate: Certificate.fromCertificateArn(
          stack,
          'PalqeeCert',
          String(process.env.AWS_CERTIFICATE_ARN),
        ),
      },
    },
  }
}
