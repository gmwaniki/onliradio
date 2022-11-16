import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { geo, headers } = request;

  const response = NextResponse.rewrite(
    `${request.nextUrl.href}/${geo?.country || 'KE'}`
  );
  response.cookies.set('code', geo?.country || 'KE');
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/app',
};
