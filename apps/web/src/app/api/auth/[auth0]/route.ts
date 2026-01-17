import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth();
export const POST = handleAuth(); // Technically handleAuth handles both, but usually just exported as GET for page router, but for App Router:

// App Router correct usage:
// export const GET = handleAuth();
