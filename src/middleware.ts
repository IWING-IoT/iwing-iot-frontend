import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname === "/account-management") {
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
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
