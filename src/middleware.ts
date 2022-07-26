import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { nextUrl, geo } = request;
  // const country = geo?.count
  nextUrl.searchParams.set('country', `${geo?.country || 'KE'}`);
  return NextResponse.rewrite(nextUrl);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/app',
};
