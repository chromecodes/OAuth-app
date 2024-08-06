import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let currentPath = request.nextUrl.pathname;

  let token = request.cookies.get("token")?.value || "";
  console.log(token);

  let isPublicPath = currentPath === "/login" || currentPath === "/signup";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/signup", "/profile", "/login"],
};
