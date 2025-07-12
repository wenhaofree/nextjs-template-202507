import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - static files (public folder)
    // - api routes (including auth)
    // - auth pages (signin, signup, etc.)
    // - next.js internals
    '/((?!_next|api|auth|favicon.ico|.*\\.).*)',
  ],
};