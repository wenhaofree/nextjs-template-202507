import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'zh'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Hide the default locale prefix (e.g., /en will be /)
  localePrefix: 'as-needed'
});

// Type definitions for better TypeScript support
export type Locale = (typeof routing.locales)[number];
