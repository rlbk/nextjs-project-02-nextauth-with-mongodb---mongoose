import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicPath =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/verify-email";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token)
    return NextResponse.redirect(new URL("/", request.url));
  if (!isPublicPath && !token)
    return NextResponse.redirect(new URL("/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile",
    "/profile/:id*",
    "/verify-email",
  ],
};
