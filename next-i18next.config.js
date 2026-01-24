/** @type {import('next-i18next').I18NextConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'sw','ln'], // English, French, Swahili
  },
  react: { useSuspense: false },
  localeDetection: false, // ⬅️ THIS is what stops auto redirect
  //  detection: {
  //   order: ['path', 'cookie', 'header'], // check path first
  //   caches: [], // don't store in cookies or localStorage
  // },
};
