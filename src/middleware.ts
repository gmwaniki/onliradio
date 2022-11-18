import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { geo, headers } = request;

  const requestHeaders = new Headers(headers);
  requestHeaders.set('x-code', geo?.country || 'KE');

  // const response = NextResponse.rewrite(
  //   `${request.nextUrl.href}/${geo?.country || 'KE'}`,
  //   { request: { headers: requestHeaders } }
  // );

  // return response;
  return NextResponse.next({ request: { headers: requestHeaders } });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/app/:path*', '/'],
};
