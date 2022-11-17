import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
  // if user is login
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const {pathname} = request.nextUrl;
  if (token || pathname.includes('/api/auth') || pathname.includes('/_next')) {
    if (pathname === '/login') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }
  // if user is not login
  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

