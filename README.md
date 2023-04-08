# nextjs-sentry-nextauth-lambda-error

- Run `pnpm install`
- Build SST `NEXT_PUBLIC_BUILD_ENV=develop pnpm run build:sst`
- Deploy AWS Lambda `NEXT_PUBLIC_BUILD_ENV=develop pnpm run deploy`

Ensure you have the correct profile setup for AWS. Once deployed start the cloudfront url and check the console you will see the `CLIENT_FETCH_ERROR`
