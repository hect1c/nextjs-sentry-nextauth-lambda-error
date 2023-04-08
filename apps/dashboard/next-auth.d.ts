import "next-auth/jwt"

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
import { IncomingMessage, ServerResponse } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'

type User = any
interface NextAuthProps {
  mfaType?: string
  loginPayload?: string
  loginSessionId?: string
}

declare module 'next-auth' {
  type SessionUser = Record<string, string> & RecusirvePartial<User> & unknown

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session extends NextAuthProps {
    user?: Partial<SessionUser>
    expires?: string
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  export interface JWT extends NextAuthProps {
    accessToken?: string
    refreshToken?: string
    userRole?: "admin"
    expires?: string
    exp?: any
    iat?: any
    sub?: string
    mail?: string
  }
}

type ServerRequest = IncomingMessage & {
  cookies: NextApiRequestCookies
}

interface INextAuthConfigProps<
  K = NextApiRequest | ServerRequest,
  T = NextApiResponse | ServerResponse,
> {
  res: T
  req: K
}
