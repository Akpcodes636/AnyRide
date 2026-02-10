// import createMiddleware from "next-intl/middleware";

// export default createMiddleware({
//   locales: ["en", "fr", "sw", "ln"],
//   defaultLocale: "en"
// });

// // export const config = {
// //   matcher: ["/((?!_next|favicon.ico).*)"]
// // };
// export const config = {
//   matcher: [
//     // Match all pathnames except:
//     // api routes, _next internal routes, and files with extensions
//     '/((?!api|_next|.*\\..*).*)',
//   ],
// };


import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "fr", "sw", "ln"], // add Lingala if needed
  defaultLocale: "en",
});

// export const config = {
//   matcher: ["/((?!_next|favicon.ico|images|icons).*)"],
// };

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|images|icons|api).*)", // exclude /api
  ],
};

