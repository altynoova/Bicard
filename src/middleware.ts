import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ru','ky'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  localePrefix: 'always'
});
 
export const config = {
  // Match only internationalized pathnames
  // matcher: ['/', '/(ky|en|ru)/:path*']
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(ky|en|ru)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};