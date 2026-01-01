/** @type {import('next-i18next').I18NextConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'sw'], // English, French, Swahili
  },
  react: { useSuspense: false },
};
