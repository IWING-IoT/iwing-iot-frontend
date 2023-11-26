import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname === "/home" || req.nextUrl.pathname === "/") {
        return token?.role === "admin" || token?.role === "user";
      } else if (req.nextUrl.pathname === "/account-management") {
        return token?.role === "admin";
      }

      return Boolean(token);
    },
  },
  pages: {
    signIn: "/signin",
  },
});

export const config = {
  matcher: [
    "/home",
    "/project/:path*",
    "/devices/:path*",
    "/firmware/:path*",
    "/account-management",
    "/archived-projects/:path*",
    "/settings",
    '/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)',
  ],
};
