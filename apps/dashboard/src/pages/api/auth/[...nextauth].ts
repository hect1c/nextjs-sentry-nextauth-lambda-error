import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const LOGIN = '/auth/login'
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    Credentials({
      id: 'login',
      credentials: {},
      name: 'Login',
      authorize: async (props) => {
        console.log('props', props)
        try {
          const result = await fetch('', {
            method: 'POST',
            body: JSON.stringify({
              query: '',
            }),
          })

          return result.json()
        } catch (error) {
          throw error
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  // jwt: {},

  // You can define custom pages to override the built-in pages.
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: LOGIN, // Displays signin buttons
    signOut: LOGIN, // Displays form with sign out button
    error: LOGIN, // Error code passed in query string as ?error=
    // verifyRequest: '/api/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
  callbacks: {
    session: async ({ session = {}, token }) => {
      return {
        ...session,
        ...token,
      }
    },
    async jwt({ token, user }) {
      if (user) {
        const { ...rest } = user

        return {
          user: { ...(rest as {}) },
          ...token,
        }
      }

      // user data is data received after signin
      // and or session client access

      token.userRole = 'admin'
      return token
    },
  },
  logger: {
    error: (code, metadata) => {
      console.error(
        `logger [error] code ${code}; metadata: ${JSON.stringify(
          metadata,
          null,
          2,
        )};`,
      )
    },
    debug: (code, metadata) => {
      console.log(`logger [debug] code ${code} & ${JSON.stringify(metadata)}`)
    },
  },
}

const Auth = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions)
}

export default Auth
