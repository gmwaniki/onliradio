import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// // This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { geo } = request;

  if (request.nextUrl.pathname === '/app') {
    return NextResponse.rewrite(
      `${request.nextUrl.origin}/app/${geo?.country || 'KE'}`
    );
  }
}
