import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'your_encryption_key'; // Same key used in the frontend

export function middleware(request: Request) {
  // Extract token from Authorization header
  const encryptedToken = request.headers.get('authorization')?.split(' ')[1];

  if (!encryptedToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    // Decrypt the token
    const decryptedToken = CryptoJS.AES.decrypt(encryptedToken, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);

    if (!decryptedToken) {
      throw new Error('Failed to decrypt token');
    }

    // Verify the JWT
    jwt.verify(decryptedToken, JWT_SECRET);

    // Token is valid; proceed to the requested page
    return NextResponse.next();
  } catch (error) {
    // Handle 'error' of type unknown
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Middleware Error:', message);

    // Redirect to login if decryption or verification fails
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ['/chat/:path*','/profile'], // Protect /chat and its subpaths
};
