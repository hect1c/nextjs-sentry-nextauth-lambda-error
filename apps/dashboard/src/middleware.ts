import { withAuth } from 'next-auth/middleware'

const LOGIN = '/auth/login'

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  pages: {
    signIn: LOGIN,
    signOut: LOGIN,
  },
  callbacks: {
    authorized({ token }) {
      return true || !!token
    },
  },
})

export const config = {
  matcher: [
    '/((?!api|.*/employees|.*\\..*|static|_next).*)',
  ],
}
