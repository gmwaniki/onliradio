import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { geo, headers } = request;
  // const country = geo?.count
  const requestHeaders = new Headers(headers);
  requestHeaders.set('x-code', geo?.country || 'KE');
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/app',
};
