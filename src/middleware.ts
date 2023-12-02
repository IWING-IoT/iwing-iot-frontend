import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // console.log(request.nextUrl.pathname);
    // console.log(request.nextauth.token);

    if (
      request.nextUrl.pathname.startsWith("/account-management") &&
      request.nextauth.token?.role !== "admin"
    ) {
      //redirect unauthorized user to denied page
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => Boolean(token),
    },
    pages: {
      signIn: "/signin",
    },
  },
);

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
