export const jwtCallback =
  () =>
  ({
    token,
    user,
  }: {
    token: Record<string, string>
    user: Record<string, string>
  }) => {
    if (user) {
      const {
        accessToken,
        refreshToken,
        expiresAfterSeconds,
        loginSessionId,
        loginPayload,
        accessTokenExpires,
        language,
        ...rest
      } = user

      return {
        accessToken,
        loginPayload,
        loginSessionId,
        user: { ...(rest as {}), language },
        ...token,
      }
    }

    // user data is data received after signin
    // and or session client access
    return token
  }
