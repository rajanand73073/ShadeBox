import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (!token) {
    console.log("No token found. Redirecting unauthenticated users...");
  }

  // Redirect authenticated users away from sign-in/sign-up
  if (token && (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up') || url.pathname.startsWith('/verify'))) {
    console.log("token1",token);
    
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users away from the dashboard
  if (!token && url.pathname.startsWith('/dashboard')) {
    console.log("token2",token);
    
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

console.log("token3",token);


  return NextResponse.next();
}
