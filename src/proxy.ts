import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const authToken = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const publicPaths = [
    "/users/login",
    "/users/registration",
    "/password/reset",
  ];

  const protectedRoute = [
    "/dashboard",
    "/purchase-history",
    "/sent-refund-request",
    "/wishlists",
    "/wallet",
    "/profile",
  ]

  const isPublicPath =
    publicPaths.some((path) => pathname.startsWith(path)) ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.startsWith("/images/") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".svg");

    const isProtectedRoute =
    protectedRoute.some((path) => pathname.startsWith(path))

  if (isPublicPath) {
    if (
      authToken &&
      (pathname.startsWith("/users/login") ||
        pathname.startsWith("/users/registration"))
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }


  if (!authToken && isProtectedRoute) {
    const loginUrl = new URL("/", request.url);
    // loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|assets|api).*)",
  ],
};
