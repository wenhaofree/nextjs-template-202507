import { createI18nMiddleware } from 'fumadocs-core/i18n';
import { i18n } from '@/lib/i18n';

export default createI18nMiddleware(i18n);

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