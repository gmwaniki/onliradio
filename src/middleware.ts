import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// // This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { geo } = request;
  const cspHeader = `    
    upgrade-insecure-requests;
`;

  const requestHeaders = new Headers(request.headers);

  requestHeaders.set(
    'Content-Security-Policy',
    // Replace newline characters and spaces
    cspHeader.replace(/\s{2,}/g, ' ').trim()
  );

  const rewriteUrl = new URL(`/app/${geo?.country || 'no'}`, request.url);
  const regex = /^\/app$/;

  if (regex.test(request.nextUrl.pathname)) {
    return NextResponse.rewrite(rewriteUrl, { headers: requestHeaders });
  }
  return NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders,
    },
  });
}
