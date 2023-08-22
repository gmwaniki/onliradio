import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// // This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { geo } = request;

  const rewriteUrl = new URL(`/app/${geo?.country || 'no'}`, request.url);

  if (request.nextUrl.pathname === '/app') {
    return NextResponse.rewrite(rewriteUrl);
  }
}
