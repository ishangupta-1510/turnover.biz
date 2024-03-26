import type {NextRequest} from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("token")?.value;

  if (
    !currentUser &&
    !request.nextUrl.pathname.startsWith("/register") &&
    !request.nextUrl.pathname.startsWith("/login")
  ) {
    return Response.redirect(new URL("/register", request.url));
  }
  return null;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
