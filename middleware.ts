import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "fr", "sw", "ln"], // add Lingala if needed
  defaultLocale: "en",
  // localeDetection: false,
  localePrefix: "as-needed",
});

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|images|icons|api).*)", // exclude /api
  ],
};

