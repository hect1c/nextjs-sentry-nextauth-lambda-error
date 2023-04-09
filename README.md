# nextjs-sentry-nextauth-lambda-error

- Run `pnpm install`
- Build SST `NEXT_PUBLIC_BUILD_ENV=develop pnpm run build:sst`
- Deploy AWS Lambda `NEXT_PUBLIC_BUILD_ENV=develop pnpm run deploy`
- Visit `${cloudFronturl}/auth/login`

Ensure you have the correct profile / credentials setup for AWS. Once deployed visit `${cloudFronturl}/auth/login` in your browser and check the console you will see the `CLIENT_FETCH_ERROR`
