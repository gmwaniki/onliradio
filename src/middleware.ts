import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { nextUrl, geo } = request;
  // const country = geo?.count
  if (nextUrl.searchParams.has('country')) {
    return NextResponse.next();
  } else {
    nextUrl.searchParams.set('country', `${geo?.country || 'KE'}`);

    return NextResponse.redirect(nextUrl);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/app',
};
