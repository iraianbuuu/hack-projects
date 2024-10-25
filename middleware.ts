import { NextResponse } from 'next/server';

const token = 1;

export function middleware() {
  if (token) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = { matcher: ['/dashboard/:path*'] };