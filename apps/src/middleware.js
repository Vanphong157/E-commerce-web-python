import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const isAdmin = request.cookies.get('isAdmin')?.value;

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token || isAdmin !== 'true') {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*'
}; 