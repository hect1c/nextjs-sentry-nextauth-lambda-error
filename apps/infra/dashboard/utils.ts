export const setDomainPrefix = () => {
  // setup domain
  let prefix = ''

  if (process.env.NEXT_PUBLIC_BUILD_ENV === 'develop') {
    prefix = 'feat'
  }

  return prefix
}

export const setEnvironmentVariables = (): Record<string, string> => {
  const keys = ['NEXT_PUBLIC_BUILD_ENV', 'NEXTAUTH_URL', 'NEXTAUTH_SECRET', 'NEXT_PUBLIC_SUPPORTED_LOCALES']

  const environment = {} as Record<string, string>

  keys.forEach((key) => {
    if (process.env[key]) {
      environment[key] = String(process.env[key])
    }
  })

  return environment
}
