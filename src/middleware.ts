import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { geo, headers } = request;

  return NextResponse.rewrite(
    `${request.nextUrl.href}/${geo?.country || 'KE'}`
  );
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/app',
};
